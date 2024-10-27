import { FriendRequest as IFriendRequest } from '@/components/features/friend-request/request.types';
import { auth } from '@/lib/auth';
import { FriendRequestWrapper } from '@components';
import { User } from '@types';
import { fetchRedis } from '@utils';

const FriendRequestPage = async () => {
  const session = await auth();
  const incomingSenderIds = await fetchRedis<string[]>(
    'smembers',
    `user:${session?.user.id}:incoming_friend_requests`,
  );

  const incomingFriendRequests: IFriendRequest[] = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = await fetchRedis<string>('get', `user:${senderId}`);
      const parsedSender = JSON.parse(sender) as User;

      return {
        senderId,
        senderEmail: parsedSender.email,
      };
    }),
  );

  return <FriendRequestWrapper list={incomingFriendRequests} />;
};

export default FriendRequestPage;
