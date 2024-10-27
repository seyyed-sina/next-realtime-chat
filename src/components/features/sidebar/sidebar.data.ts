import { routes } from '@constants';

import { SidebarItem } from './sidebar.types';

export const sidebarItems: SidebarItem[] = [
  {
    id: 0,
    name: 'Dashboard',
    href: routes.HOME,
    icon: 'gauge',
  },
  {
    id: 1,
    name: 'Add a friend',
    href: routes.ADD_FRIEND,
    icon: 'user-plus',
  },
];
