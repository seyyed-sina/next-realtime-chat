import { memo, PropsWithChildren } from 'react';

import { clx } from '@utils';

interface PageSectionProps extends PropsWithChildren {
  title?: string;
  className?: string;
}

export const PageSection = memo(
  ({ title, className, children }: PageSectionProps) => {
    return (
      <section className={clx('p-8', className)}>
        {title && <h1 className="text-3xl mb-5">{title}</h1>}
        {children}
      </section>
    );
  },
);

PageSection.displayName = 'PageSection';
