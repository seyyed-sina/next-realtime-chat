import { friendRequestsCount } from '../sidebar.action';

export const SidebarFriendRequestCount = async () => {
  const requestCount = await friendRequestsCount();

  if (requestCount === 0) {
    return null;
  }

  return (
    <span className="ml-auto text-xs rounded-full bg-primary-300 text-white size-5 flex items-center justify-center text-center">
      {requestCount}
    </span>
  );
};

SidebarFriendRequestCount.displayName = 'SidebarFriendRequestCount';
