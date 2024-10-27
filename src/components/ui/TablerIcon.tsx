'use client'
import { memo } from 'react';

import { LucideIcon, LucideProps } from 'lucide-react';

interface TablerIconProps extends LucideProps {
  icon: LucideIcon;
}

export const TablerIcon = memo(({ icon: Icon, ...props }: TablerIconProps) => {
  return <Icon strokeWidth={1.25} {...props} />;
});

TablerIcon.displayName = 'TablerIcon';
