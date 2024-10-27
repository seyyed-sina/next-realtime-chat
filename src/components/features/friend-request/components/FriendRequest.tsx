import { memo } from 'react';

import { LucidIcon, SubmitButton } from '@components';

import { acceptAction, rejectAction } from '../request.action';
import { FriendRequest as IFriendRequest } from '../request.types';

interface FriendRequestProps {
  list: IFriendRequest[];
}

export const FriendRequest = memo(({ list }: FriendRequestProps) => {
  return (
    <div>
      <div>{list.length === 0 && <p>No friend requests</p>}</div>

      {list.length > 0 && (
        <div className="flex flex-col gap-5">
          {list.map((request) => (
            <div key={request.senderId} className="flex items-center gap-3">
              <LucidIcon name="user" className="size-6" />
              {request?.senderEmail}
              <div className="flex items-center gap-2">
                <form action={acceptAction.bind(null, request.senderId)}>
                  <SubmitButton
                    aria-label="Accept friend"
                    className="bg-green text-white size-8"
                    spinnerSize={20}
                    variant="empty">
                    <LucidIcon name="check" className="size-5" />
                  </SubmitButton>
                </form>
                <form action={rejectAction.bind(null, request.senderId)}>
                  <SubmitButton
                    aria-label="Deny friend"
                    className="bg-red text-white size-8"
                    spinnerSize={20}
                    variant="empty">
                    <LucidIcon name="x" className="size-5" />
                  </SubmitButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

FriendRequest.displayName = 'FriendRequest';
