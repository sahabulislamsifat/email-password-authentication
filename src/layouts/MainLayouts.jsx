import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const MainLayouts = () => {
  return (
    <div className="container mx-auto mt-10">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayouts;
