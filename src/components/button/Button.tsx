import { ButtonHTMLAttributes, memo, ReactNode, useMemo } from 'react';

import { cva, VariantProps } from 'cva';
import Link, { LinkProps } from 'next/link';

import { XOR } from '@types';
import { clx } from '@utils';

const buttonVariants = cva({
  base: 'flex items-center justify-center text-center select-none rounded-lg relative group overflow-hidden transition-all duration-300 border-none',
  variants: {
    variant: {
      primary: 'bg-primary text-white hover:bg-primary-500',
      secondary: 'bg-secondary text-white hover:bg-secondary-500',
    },
    size: {
      small: 'text-sm py-1 px-2 h-10',
      medium: 'text-base py-2 px-4 h-11',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export type ButtonBaseProps = VariantProps<typeof buttonVariants> &
  XOR<{ children: ReactNode }, { label: string }> & {
    className?: string;
  };

export type TButtonProps = {
  tag?: 'button';
} & ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export type TLinkProps = {
  tag: 'a';
} & ButtonBaseProps &
  LinkProps;

export type ButtonProps = TButtonProps | TLinkProps;

export const Button = memo(
  ({ children, label, size, variant, className, ...props }: ButtonProps) => {
    const baseClass = useMemo(
      () => clx(buttonVariants({ variant, size, className })),
      [className, size, variant],
    );

    if (props.tag === 'a') {
      const { ...rest } = props;
      return (
        <Link className={baseClass} aria-label={label} {...rest}>
          {label ?? children}
        </Link>
      );
    }

    const { ...rest } = props;
    const buttonClass = clx(
      baseClass,
      rest.disabled && 'cursor-not-allowed opacity-70 pointer-events-none',
      className,
    );

    return (
      <button
        type="button"
        className={buttonClass}
        aria-label={label}
        disabled={rest.disabled}
        aria-disabled={rest.disabled}
        {...rest}>
        {label ?? children}
      </button>
    );
  },
);

Button.displayName = 'Button';
