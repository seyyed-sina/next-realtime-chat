import { SignInButton } from '@components';

export const SignIn = () => {
  return (
    <div className="flex items-center justify-center text-center h-full">
      <div className="container">
        <div className="flex flex-col gap-5 p-10 rounded-md bg-slate-500/10 shadow-lg">
          <h2 className="text-xl">Sign in to your account</h2>
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

SignIn.displayName = 'SignIn';
