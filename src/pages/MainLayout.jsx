import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <React.Fragment>
        <div>
          <Navbar />
          <div className="2xl:px-36 px-4 mt-[20px] md:flex sm:flex sm:justify-center">
            {children}
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default MainLayout;
