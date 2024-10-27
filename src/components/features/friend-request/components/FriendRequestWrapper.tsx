import { memo, Suspense } from 'react';

import { FriendRequest, PageSection } from '@components';

import { FriendRequest as IFriendRequest } from '../request.types';

interface FriendRequestWrapperProps {
  list: IFriendRequest[];
}

export const FriendRequestWrapper = memo(
  ({ list }: FriendRequestWrapperProps) => {
    return (
      <PageSection title="Friend requests">
        <Suspense fallback={<div>Loading...</div>}>
          <FriendRequest list={list} />
        </Suspense>
      </PageSection>
    );
  },
);

FriendRequestWrapper.displayName = 'FriendRequestWrapper';
