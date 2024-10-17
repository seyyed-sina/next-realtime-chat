import { IconLogout } from '@tabler/icons-react';

import { SubmitButton } from '@components';

import { singOutAction } from '../auth.actions';

export const SignOutButton = () => {
  return (
    <form action={singOutAction} className="shrink-0">
      <SubmitButton variant="secondary">
        <IconLogout size={20} />
        Sign Out
      </SubmitButton>
    </form>
  );
};

SignOutButton.displayName = 'SignOutButton';
