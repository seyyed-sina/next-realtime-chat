import { Suspense } from 'react';

import { DotLoading, SidebarFriendRequestCount } from '@components';
import { colorValue } from '@constants';

export const SidebarFriendRequestWrapper = () => {
  return (
    <span className="flex items-center grow">
      Friend requests
      <Suspense
        fallback={
          <DotLoading
            size={20}
            fill={colorValue.primary[400]}
            className="ml-auto"
          />
        }>
        <SidebarFriendRequestCount />
      </Suspense>
    </span>
  );
};

SidebarFriendRequestWrapper.displayName = 'SidebarFriendRequestWrapper';
