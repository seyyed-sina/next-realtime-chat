import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { redisDb } from '@/lib/db';
import { routes } from '@constants';
import { LocalResponse } from '@types';
import { fetchRedis } from '@utils';

export const POST = async (req: Request) => {
  const res: LocalResponse<null> = {
    data: null,
    status: 500,
    message: 'Something went wrong',
    error: true,
  };

  try {
    const session = await auth();
	console.log('session: ', session);
    if (!session) {
      return NextResponse.json({
        ...res,
        status: 401,
        message: 'Unauthorized',
      });
    }

    const currentUserId = session?.user.id;
    const body = await req.json();
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

    // Check if already added to my list
    const isAlreadyFriend = await fetchRedis(
      'sismember',
      `user:${currentUserId}:friends`,
      idToAdd,
    );

    if (isAlreadyFriend) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: 'Already friend with this user',
      });
    }

    const hasFriendRequest = await fetchRedis(
      'sismember',
      `user:${currentUserId}:incoming_friend_requests`,
      idToAdd,
    );

    if (!hasFriendRequest) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: 'No friend request from this user',
      });
    }

    // Accept friend request
    await redisDb.sadd(`user:${currentUserId}:friends`, idToAdd);
    // And add me as friend
    await redisDb.sadd(`user:${idToAdd}:friends`, currentUserId);

    // Remove from incoming friend requests
    await redisDb.srem(
      `user:${currentUserId}:incoming_friend_requests`,
      idToAdd,
    );
    revalidatePath(routes.FRIEND_REQUESTS);
    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        ...res,
        status: 500,
        message: error.message,
      });
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        ...res,
        status: 422,
        message: `Invalid input: ${error.issues[0].message}`,
      });
    }

    return NextResponse.json({
      ...res,
      status: 500,
      message: 'Something went wrong',
    });
  }
};
