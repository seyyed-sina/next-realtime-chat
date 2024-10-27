import { LucidIcon, SubmitButton } from '@components';

import { singOutAction } from '../auth.actions';

export const SignOutButton = () => {
  return (
    <form className="ml-auto flex items-center" action={singOutAction}>
      <SubmitButton variant="empty" spinnerFill="#ff0000">
        <LucidIcon
          name="log-out"
          className="size-6 text-red"
          strokeWidth={1.5}
        />
        <span className="sr-only">Sign Out</span>
      </SubmitButton>
    </form>
  );
};

SignOutButton.displayName = 'SignOutButton';
