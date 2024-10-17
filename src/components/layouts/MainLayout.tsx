import { memo, PropsWithChildren } from 'react';

type MainLayoutProps = PropsWithChildren

export const MainLayout = memo(({ children }: MainLayoutProps) => {
  return <main>{children}</main>;
});

MainLayout.displayName = 'MainLayout';
