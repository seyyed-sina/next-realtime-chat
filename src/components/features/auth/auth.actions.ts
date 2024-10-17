'use server';

import { signIn, signOut } from '@/lib/auth';
import { routes } from '@constants';

export const singInAction = async () => {
  await signIn('google', { redirectTo: routes.HOME });
};

export const singOutAction = async () => {
  await signOut({
    redirectTo: routes.SIGN_IN,
  });
};
