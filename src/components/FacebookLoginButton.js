import React from "react";
import { FacebookLoginButton } from "react-social-login-buttons";

const FacebookLoginButtonComponent = ({ login }) => {
  return (
    <div className="border rounded-lg shadow-md py-16 px-5">
      <div className="mb-10 text-left">
        <h1 className="text-3xl font-semibold">Welcome to PageInsightPro</h1>
        <h2 className="text-2xl text-gray-600">Sign in to your account</h2>
      </div>
      <FacebookLoginButton onClick={login} />
    </div>
  );
};

export default FacebookLoginButtonComponent;
