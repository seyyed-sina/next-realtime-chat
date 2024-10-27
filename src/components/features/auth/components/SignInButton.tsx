import { SubmitButton, LucidIcon } from '@components';

import { singInAction } from '../auth.actions';

export const SignInButton = () => {
  return (
    <form action={singInAction}>
      <SubmitButton className="mx-auto">
        <LucidIcon name="log-in" />
        Sign in with Google
      </SubmitButton>
    </form>
  );
};
