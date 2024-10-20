import { env } from '@constants';

const upstashBaseUrl = env.UPSTASH_REDIS_REST_URL;
const upstashToken = env.UPSTASH_REDIS_REST_TOKEN;

type Command = 'zrange' | 'sismember' | 'get' | 'smembers';

export const fetchRedis = async (
  command: Command,
  ...args: (string | number)[]
) => {
  const commandUrl = `${upstashBaseUrl}/${command}/${args.join('/')}`;
  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${upstashToken}`,
    },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data from Redis');
  }

  const data = (await response.json()) as { result: string | null };
  return data.result;
};
