import { auth } from '@/lib/auth';
import { redisDb } from '@/lib/db';
import { Button } from '@components';
import { routes } from '@constants';

export default async function Home() {
  await redisDb.set('hello', 'sina');

  const session = await auth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      hello from sina
      <pre className="break-words flex w-auto break-all text-wrap p-8 text-white bg-slate-800">
        {JSON.stringify(session)}
      </pre>
      <Button
        label="Sign In"
        variant="secondary"
        tag="a"
        href={routes.SIGN_IN}
      />
    </div>
  );
}
