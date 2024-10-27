'use server';
import { auth } from '@/lib/auth';
import { fetchRedis } from '@utils';

/**
 * Retrieves the count of incoming friend requests for the current user.
 *
 * This function authenticates the current session, retrieves the user ID,
 * and fetches the list of incoming friend requests from the Redis database
 * for that user. It returns the count of such requests.
 *
 * @returns {Promise<number>} The number of incoming friend requests.
 */
export async function friendRequestsCount() {
  const session = await auth();

  const sessionId = session?.user.id;
  const requestsCount = (
    await fetchRedis<string[]>(
      'smembers',
      `user:${sessionId}:incoming_friend_requests`,
    )
  ).length;

  return requestsCount;
}
