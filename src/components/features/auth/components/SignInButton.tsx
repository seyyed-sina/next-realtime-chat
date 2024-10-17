import { IconBrandGithub } from '@tabler/icons-react';

import { SubmitButton } from '@components';

import { singInAction } from '../auth.actions';

export const SignInButton = () => {
  return (
    <form action={singInAction}>
      <SubmitButton className="gap-2 mx-auto bg-slate-700">
        <IconBrandGithub size={20} />
        Sign in with GitHub
      </SubmitButton>
    </form>
  );
};
