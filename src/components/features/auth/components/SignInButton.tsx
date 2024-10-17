'use client';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { toast } from 'sonner';

import { TablerIcon, SubmitButton } from '@components';

import { singInAction } from '../auth.actions';

export const SignInButton = () => {
  const formAction = async () => {
    try {
      await singInAction();
    } catch {
      toast.error('Something went wrong while signing in');
    }
  };

  return (
    <form action={formAction}>
      <SubmitButton className="gap-2 mx-auto">
        <TablerIcon icon={IconBrandGoogleFilled} />
        Sign in with Google
      </SubmitButton>
    </form>
  );
};
