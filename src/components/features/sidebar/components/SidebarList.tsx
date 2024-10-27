import { useMemo } from 'react';

import { SidebarFriendRequestWrapper, SidebarItem } from '@components';
import { routes } from '@constants';

import { sidebarItems } from '../sidebar.data';
import { SidebarItem as TSidebarItem } from '../sidebar.types';

export const SidebarList = () => {
  const sidebarList = useMemo(() => {
    return [
      ...sidebarItems,
      {
        id: 2,
        name: <SidebarFriendRequestWrapper />,
        href: routes.FRIEND_REQUESTS,
        icon: 'users',
      },
    ] as TSidebarItem[];
  }, []);

  return (
    <ul className="grow">
      {sidebarList.map((item) => (
        <SidebarItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

SidebarList.displayName = 'SidebarList';
