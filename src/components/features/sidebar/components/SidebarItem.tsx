'use client';
import { memo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LucidIcon } from '@components';
import { clx } from '@utils';

import { SidebarItem as TSidebarItem } from '../sidebar.types';

type SidebarItemProps = {
  item: TSidebarItem;
};

export const SidebarItem = memo(({ item }: SidebarItemProps) => {
  const { href, name, icon: iconName } = item;
  const pathname = usePathname();

  const isActive = (href: string) => href === pathname;

  return (
    <li>
      <Link
        href={href}
        className={clx(
          'flex items-center gap-4 px-3 py-2 text-sm hover:[&:not(.active)]:bg-primary-100/40 rounded-lg min-h-11',
          isActive(href) && 'bg-primary-100 text-primary font-medium active',
        )}>
        {iconName && (
          <LucidIcon
            name={iconName}
            className="size-6 shrink-0"
            strokeWidth={1.5}
          />
        )}
        {name}
      </Link>
    </li>
  );
});

SidebarItem.displayName = 'SidebarItem';
