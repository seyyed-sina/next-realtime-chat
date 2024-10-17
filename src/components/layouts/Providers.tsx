'use client';
import { memo, PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

type ProvidersProps = PropsWithChildren;

export const Providers = memo(({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-center"
        visibleToasts={1}
        toastOptions={{
          classNames: {
            error: 'bg-red text-white',
            success: 'bg-green text-white',
          },
        }}
      />
    </SessionProvider>
  );
});

Providers.displayName = 'Providers';
