import { SanityImage as SanityImageComponent } from 'sanity-image';
import { projectId, dataset } from '@lib/sanity';

const SanityImage = ({
  asset,
  alt,
  className,
  ...props
}: React.ComponentProps<typeof SanityImageComponent>) => (
  <SanityImageComponent
    // Pass the Sanity Image ID (`_id`) (e.g., `image-abcde12345-1200x800-jpg`)
    {...props}
    id={asset?._id || asset?._ref}
    baseUrl={`https://cdn.sanity.io/images/${projectId}/${dataset}/`}
    className={className}
    alt={alt}
  />
);

export default SanityImage;
