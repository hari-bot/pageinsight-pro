import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-blue-700" : "";
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div className="flex items-center py-5 px-2 text-gray-200">
              <span className="font-bold text-xl">PageInsightPro</span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`py-5 px-3 hover:bg-blue-700 transition duration-300 ${isActive(
                  "/"
                )}`}
              >
                Home
              </Link>
              <Link
                to="/ig-analytics"
                className={`py-5 px-3 hover:bg-blue-700 transition duration-300 ${isActive(
                  "/ig-analytics"
                )}`}
              >
                IG Analytics
              </Link>
              <Link
                to="/partnership-ads"
                className={`py-5 px-3 hover:bg-blue-700 transition duration-300 ${isActive(
                  "/partnership-ads"
                )}`}
              >
                Manage Partnership
              </Link>
              <Link
                to="/boost-acess"
                className={`py-5 px-3 hover:bg-blue-700 transition duration-300 ${isActive(
                  "/boost-acess"
                )}`}
              >
                Boost Access
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
