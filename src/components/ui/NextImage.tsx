import { FC, memo } from 'react';

import Image, { ImageProps } from 'next/image';

export const NextImage: FC<ImageProps> = memo(({ ...props }) => {
  return <Image quality={100} {...props} src={props.src} alt={props.alt} />;
});

NextImage.displayName = 'NextImage';
