import Image, { ImageProps } from 'next/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlForImage, imageBuilder } from '@lib/sanity';

interface SanityImageProps extends Omit<ImageProps, 'src' | 'height'> {
  src: SanityImageSource;
  quality?: number;
  blur?: number;
  alt: string;
  height?: any;
}

export default function SanityImage({
  quality = 80,
  blur = 0,
  // imageBuilder,
  height = null,
  src,
  alt,
  ...props
}: SanityImageProps) {
  const baseURL = 'https://cdn.sanity.io/images/';

  // @ts-ignore
  const url = urlForImage(src).auto('format').fit('clip').width(1000).url();

  return <Image alt={alt} url={url} {...props} />;

  // return (
  //   <Image
  //     {...props}
  //     alt={alt}
  //     loader={({ width: srcWidth }) => {
  //       let url =
  //         imageBuilder
  //           .image(src)
  //           .width(srcWidth)
  //           // .height(Number(props?.height) || 256)
  //           // .height(height ? Number(height) : null)
  //           .auto('format')
  //           .quality(quality)
  //           // .fit('clip')
  //           .url() ?? '';

  //       if (blur) {
  //         url += `&blur=${blur}`;
  //       }

  //       return url;
  //     }}
  //     // src={imageBuilder.image(src).url()?.toString().replace(baseURL, '') ?? ''}
  //     src={imageBuilder.image(src).url()}
  //   />
  // );
}
