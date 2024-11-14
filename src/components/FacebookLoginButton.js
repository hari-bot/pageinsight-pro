import React from "react";
import { FacebookLoginButton } from "react-social-login-buttons";

const FacebookLoginButtonComponent = ({ login }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to PageInsightPro
        </h1>
        <h2 className="text-xl text-gray-600">Sign in to your account</h2>
      </div>
      <FacebookLoginButton onClick={login} />
    </div>
  );
};

export default FacebookLoginButtonComponent;
