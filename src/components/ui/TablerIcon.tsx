import { memo } from 'react';

import { IconProps, TablerIcon as TTablerIcon } from '@tabler/icons-react';

interface TablerIconProps extends IconProps {
  icon: TTablerIcon;
}

export const TablerIcon = memo(({ icon: Icon, ...props }: TablerIconProps) => {
  return <Icon strokeWidth={1.25} {...props} />;
});

TablerIcon.displayName = 'TablerIcon';
