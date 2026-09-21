import type { Metadata } from "next";

import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Login" };

const Login = () => {
  return (
    <div>
      <h1 className="text-center text-xl font-semibold">Welcome back</h1>
      <p className="mt-2 mb-8 text-sm text-center text-muted-foreground">
        Please sign-in to your account and start the adventure.
      </p>
      <LoginForm />
    </div>
  );
};

export default Login;
