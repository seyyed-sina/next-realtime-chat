import { Redis } from '@upstash/redis';

import { env } from '@constants';

export const redisDb = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});
