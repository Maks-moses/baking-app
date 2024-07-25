import AuthForm from "@/components/AuthForm";
import React from "react";

const SignIn = () => {
  return (
    <div className="flex-center size-full max-sm:px-4">
      <AuthForm type="sign-in" />
    </div>
  );
};

export default SignIn;
