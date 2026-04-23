import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b-2 border-black">
      <Link to={"/"}>
        <div className="flex items-center">
          <img
            src="https://github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="Github Logo"
            className="h-[10%] w-[10%]"
          />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Link to={"/create"}>
          {" "}
          <p>Create a Repository</p>
        </Link>
        <Link to={"/profile"}>
          {" "}
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
