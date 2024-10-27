'use client';
import { FC, memo } from 'react';

import { useFormStatus } from 'react-dom';

import { Button, ButtonBaseProps, LoadingSpinner } from '@components';
import { clx } from '@utils';

type Props = {
  spinnerFill?: string;
  spinnerSize?: number;
  isSubmitting?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
} & ButtonBaseProps;

export const SubmitButton: FC<Props> = memo(
  ({ children, label, spinnerFill, spinnerSize, ...props }) => {
    const { pending } = useFormStatus();
    const isSubmitting = props.isSubmitting || pending;

    return (
      <Button
        variant={props.variant}
        tag="button"
        type={props.type ?? 'submit'}
        disabled={props.disabled || isSubmitting}
        className={props.className}>
        <span
          className={clx(
            'flex items-center gap-2',
            isSubmitting && 'opacity-0',
          )}>
          {label ?? children}
        </span>
        {isSubmitting && (
          <span className="absolute inset-0 m-auto flex justify-center items-center text-center">
            <LoadingSpinner
              size={spinnerSize ?? 24}
              fill={spinnerFill ?? '#fff'}
            />
          </span>
        )}
      </Button>
    );
  },
);

SubmitButton.displayName = 'SubmitButton';
