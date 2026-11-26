import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
