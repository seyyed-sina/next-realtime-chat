'use client';
import { FC, memo } from 'react';

import { useFormStatus } from 'react-dom';

import { Button, LoadingSpinner, TButtonProps } from '@components';
import { clx } from '@utils';

type Props = TButtonProps & {
  spinnerFill?: string;
  isSubmitting?: boolean;
};

export const SubmitButton: FC<Props> = memo(
  ({ children, label, spinnerFill, ...props }) => {
    const { pending } = useFormStatus();
    const isSubmitting = props.isSubmitting || pending;

    return (
      <Button
        type={props.type ?? 'submit'}
        disabled={props.disabled || isSubmitting}
        className="relative overflow-hidden"
        {...props}>
        <span
          className={clx(
            'flex items-center',
            isSubmitting && 'opacity-0',
            props.className,
          )}>
          {label ?? children}
        </span>
        {isSubmitting && (
          <span className="absolute inset-0 m-auto flex justify-center items-center text-center">
            <LoadingSpinner size={24} fill={spinnerFill ?? '#fff'} />
          </span>
        )}
      </Button>
    );
  },
);

SubmitButton.displayName = 'SubmitButton';
