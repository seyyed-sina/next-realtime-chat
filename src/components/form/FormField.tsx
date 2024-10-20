import { FC, HTMLAttributes, PropsWithChildren, memo } from 'react';

import { clx } from '@utils';

type Props = {
  label?: string;
  direction?: 'row' | 'column';
  inputId: string;
  required?: boolean;
  className?: string;
} & PropsWithChildren &
  HTMLAttributes<HTMLDivElement>;

export const FormField: FC<Props> = memo(
  ({
    label,
    inputId,
    direction = 'column',
    required,
    className,
    children,
    ...props
  }) => {
    return (
      <div
        className={clx(
          'flex',
          direction === 'column' ? 'flex-col' : 'flex-row',
          className,
        )}
        {...props}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-gray-500 text-sm mb-2 flex gap-1">
            {label}
            {required && <small>(required)</small>}
          </label>
        )}
        {children}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
