import { SignInButton } from "@components";

export const SignIn = () => {
  return (
    <div className="flex items-center justify-center text-center min-h-dvh">
      <div className="flex flex-col gap-5 p-10 rounded-md bg-slate-500/10 shadow-lg">
        <h1 className="text-xl">Sign in to view your repositories</h1>
        <SignInButton />
      </div>
    </div>
  );
};

SignIn.displayName = 'SignIn';
