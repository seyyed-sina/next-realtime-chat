import { FC } from 'react';

import { clx } from '@utils';

interface Props {
  message?: string;
  className?: string;
}

export const FormValidation: FC<Props> = ({ message, className }) => {
  return (
    <span className={clx('text-xs mt-1 block text-red leading-5', className)}>
      {message?.toString() ?? ''}
    </span>
  );
};

FormValidation.displayName = 'FormValidation';
