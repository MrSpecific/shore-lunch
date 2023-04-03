import Image, { ImageProps } from 'next/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityCDNClient, urlForImage, imageBuilder } from '@lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';

interface SanityImageAsset {
  asset?: any;
}

interface SanityImageProps extends Omit<ImageProps, 'src' | 'height'> {
  src: SanityImageSource & SanityImageAsset;
  quality?: number;
  blur?: number;
  alt: string;
  className?: string;
  height?: any;
}

export default function SanityImage({
  quality = 80,
  blur = 0,
  height = null,
  src,
  alt,
  className,
  ...props
}: SanityImageProps) {
  // @ts-ignore
  const imageProps = useNextSanityImage(sanityCDNClient, src);

  if (imageProps && !!props.fill) {
    delete imageProps['width'];
    delete imageProps['height'];
  }

  return (
    <Image
      // @ts-ignore
      {...imageProps}
      style={!props?.fill ? { width: 'auto', height: 'auto' } : null}
      className={className}
      alt={alt}
      placeholder="blur"
      blurDataURL={src.asset.metadata.lqip}
      {...props}
    />
  );
}
