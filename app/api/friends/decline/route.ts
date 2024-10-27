import { NextResponse } from 'next/server';
import { z } from 'zod';

import { addFriendSchema } from '@/features/add-friend/add.validator';
import { auth } from '@/lib/auth';
import { redisDb } from '@/lib/db';
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

    if (!session) {
      return NextResponse.json({
        ...res,
        status: 401,
        message: 'Unauthorized',
      });
    }

    const body = await req.json();
    const { email: emailToAdd } = addFriendSchema.parse(body);

    if (!emailToAdd) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: 'Email is required',
      });
    }

    if (emailToAdd) {
      const idToAdd = await fetchRedis<string>(
        'get',
        `user:email:${emailToAdd}`,
      );

      if (!idToAdd) {
        return NextResponse.json({
          ...res,
          status: 404,
          message: 'User not found',
        });
      }

      if (idToAdd === session.user.id) {
        return NextResponse.json({
          ...res,
          status: 400,
          message: 'You cannot add yourself',
        });
      }

      // Check if already added to my list
      const isAlreadyAdded = await fetchRedis(
        'sismember',
        `user:${idToAdd}:incoming_friend_requests`,
        session.user.id,
      );

      if (isAlreadyAdded) {
        return NextResponse.json({
          ...res,
          status: 400,
          message: 'Already added this user to your list',
        });
      }

      // Check if already friended by me
      const isAlreadyFriend = await fetchRedis(
        'sismember',
        `user:${session.user.id}:friends`,
        idToAdd,
      );

      if (isAlreadyFriend) {
        return NextResponse.json({
          ...res,
          status: 400,
          message: 'Already friend with this user',
        });
      }

      // If everything is okay, send friend request
      // and add to incoming friend requests
      await redisDb.sadd(
        `user:${idToAdd}:incoming_friend_requests`,
        session.user.id,
      );

      return NextResponse.json({
        data: idToAdd,
        status: 200,
        message: 'User added to your list',
        error: false,
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        ...res,
        status: 422,
        message: 'Invalid request data',
      });
    } else if (error instanceof Error) {
      return NextResponse.json({
        ...res,
        data: error.message,
      });
    }

    return NextResponse.json({
      ...res,
      status: 400,
      message: 'Invalid request data',
    });
  }
};
