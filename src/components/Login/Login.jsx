import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase.init";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState();
  const [errorLogin, setErrorLogin] = useState("");
  const emailRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    ///* reset Status
    setSuccess(false);
    setErrorLogin("");

    //* User login
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (!result.user.emailVerified) {
          setErrorLogin("please verified your email address");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error.message, "ERROR");
        setErrorLogin(error.message);
      });
  };

  const handleForgetPassword = () => {
    // console.log("get me an email ", emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      console.log("please provide a valid email address");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("Password reset email send, please check your email ");
      });
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                ref={emailRef}
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label onClick={handleForgetPassword} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          {errorLogin && <p className="text-red-600">{errorLogin.message}</p>}
          {success && (
            <p className="text-green-600">Hurrah! user Login Successful</p>
          )}
          {
            <p>
              New to this website? Please <Link to="/signUp">Sign Up</Link>
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
