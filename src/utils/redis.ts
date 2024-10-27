import { env } from '@constants';

const upstashBaseUrl = env.UPSTASH_REDIS_REST_URL;
const upstashToken = env.UPSTASH_REDIS_REST_TOKEN;

export type TCommand = 'zrange' | 'sismember' | 'get' | 'smembers';

export type TArgs = (string | number)[];

export const fetchRedis = async <TResult>(
  command: TCommand,
  ...args: TArgs
): Promise<TResult> => {
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

  const data = (await response.json()) as { result: TResult };
  return data.result;
};
