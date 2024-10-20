import { z } from 'zod';

import { addFriendSchema } from '@/features/add-friend/add.validator';
import { auth } from '@/lib/auth';
import { redisDb } from '@/lib/db';
import { env } from '@constants';
import { fetchRedis } from '@utils';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const validEmail = addFriendSchema.parse({ email: body.email });
    console.log('validEmail: ', validEmail);

    if (!body.email) {
      return new Response('Email is required', {
        status: 400,
      });
    }

    if (validEmail) {
      const res = await fetch(env.UPSTASH_REDIS_REST_URL, {
        headers: {
          Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}/get/user:email${validEmail.email}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        cache: 'no-store',
      });

      const data = (await res.json()) as { result: string | null };
      console.log('data: ', data);
      const session = await auth();

      if (!session) {
        return new Response('Unauthorized', {
          status: 401,
        });
      }

      console.log('data: ', data);
      if (!data.result) {
        return Response.json({
          body: data,
          status: 404,
          message: 'User not found',
        });
      }

      const idToAdd = data.result;

      if (idToAdd === session.user.id) {
        return new Response('You cannot add yourself', {
          status: 400,
        });
      }

      // Check if already added
      const isAlreadyAdded = await fetchRedis(
        'sismember',
        `user:${session.user.id}:incoming_friend_requests`,
        session.user.id,
      );

      if (isAlreadyAdded) {
        return new Response('Already added this user to your list', {
          status: 400,
        });
      }

      // Check if already firended
      const isAlreadyFriend = await fetchRedis(
        'sismember',
        `user:${session.user.id}:friends`,
        idToAdd,
      );

      if (isAlreadyFriend) {
        return new Response('Already friend with this user', {
          status: 400,
        });
      }

      // If everything is okay, send friend request
      await redisDb.sadd(
        `user:${idToAdd}:incoming_friend_requests`,
        session.user.id,
      );

      return new Response('OK', {
        status: 200,
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data', {
        status: 422,
      });
    } else if (error instanceof Error) {
      return new Response(error.message, {
        status: 500,
      });
    }

    return new Response('Invalid request data', {
      status: 400,
    });
  }
};
