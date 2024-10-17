import { memo, PropsWithChildren } from 'react';

import { Providers } from '@components';

type MainLayoutProps = PropsWithChildren;

export const MainLayout = memo(({ children }: MainLayoutProps) => {
  return (
    <Providers>
      <main>{children}</main>
    </Providers>
  );
});

MainLayout.displayName = 'MainLayout';
