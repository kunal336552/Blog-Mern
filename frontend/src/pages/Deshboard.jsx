import Sidebar from "@/Components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Deshboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Deshboard;
