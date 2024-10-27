
import { SidebarList, SidebarUser } from '@components';

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-5 min-h-full max-w-xs grow border-r border-solid border-gray-200 overflow-y-auto p-5">
      <SidebarList />
      <SidebarUser />
    </div>
  );
};

Sidebar.displayName = 'Sidebar';
