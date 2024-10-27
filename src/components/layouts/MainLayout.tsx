import { memo, PropsWithChildren } from 'react';

import { auth } from '@/lib/auth';
import { Providers, Sidebar } from '@components';

type MainLayoutProps = PropsWithChildren;

export const MainLayout = memo(async ({ children }: MainLayoutProps) => {
  const session = await auth();

  return (
    <Providers>
      <main className="flex min-h-dvh">
        {!!session && <Sidebar />}
        <div className="grow">{children}</div>
      </main>
    </Providers>
  );
});

MainLayout.displayName = 'MainLayout';
