import { ReactNode } from 'react';

import dynamicIconImports from 'lucide-react/dynamicIconImports';

export interface SidebarItem {
  id: number;
  name: ReactNode;
  href: string;
  icon?: keyof typeof dynamicIconImports;
}
