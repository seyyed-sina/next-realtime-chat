import { auth } from '@/lib/auth';
import { NextImage, SignOutButton } from '@components';

export const SidebarUser = async () => {
  const session = await auth();
  const user = session?.user;
  const avatar = user?.image ?? '';
  const userName = user?.name ?? '';

  return (
    <div className="flex items-center justify-between gap-3 mt-auto">
      {user && (
        <div className="flex items-center gap-2 truncate">
          <div className="size-10 rounded-full bg-gray-300 shrink-0">
            <NextImage
              src={avatar}
              alt={userName}
              width={40}
              height={40}
              className="rounded-full size-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 truncate">
            <h3
              className="text-base font-medium truncate text-gray-600"
              title={userName}>
              {userName}
            </h3>
            <span className="text-gray-500 text-xs">{user?.email}</span>
          </div>
        </div>
      )}
      <SignOutButton />
    </div>
  );
};
