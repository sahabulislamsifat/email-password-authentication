import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    console.log(email, password, terms, name, photo);

    //* reset error and status
    setErrorMessage("");
    setSuccess(false);

    if (!terms) {
      setErrorMessage("Please! Accept our terms and conditions.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password Should be 6 characters or longer.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "At least one uppercase, one lowercase, and one Special character"
      );
      return;
    }

    //* create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        //* sent verification email address
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verification email send");
        });

        //* update profile name and photo URL
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("user profile updated");
          })
          .catch((error) => console.log("user profile updated..."));
      })
      .catch((error) => {
        console.log(error.message, "ERROR");
        setErrorMessage(error.message);
        setSuccess(false);
      });
    console.log(email, password);
  };

  return (
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className="text-center text-2xl font-semibold">Sign Up Now!</h2>
        <form onSubmit={handleSignUp} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="input input-bordered"
              required
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-xs absolute right-2 top-12"
            >
              {showPassword ? <FaEyeLowVision /> : <FaEye></FaEye>}
            </button>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
            <div className="form-control">
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" name="terms" className=" checkbox" />
                <span className="label-text ml-2">
                  Accept Our Terms and Condition
                </span>
              </label>
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {success && (
          <p className="text-green-600">Hurrah!! Sign Up is Successful</p>
        )}
        {
          <p className="m-2">
            Already have an account? Please <Link to="/login">Login</Link>
          </p>
        }
      </div>
    </div>
  );
};

export default SignUp;
