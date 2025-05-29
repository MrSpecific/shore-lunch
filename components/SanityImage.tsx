import { SanityImage as SanityImageComponent } from 'sanity-image';
import { projectId, dataset } from '@lib/sanity';

type SanityImageComponentProps = React.ComponentProps<typeof SanityImageComponent>;
type SanityImageProps = SomeOptional<SanityImageComponentProps, 'id'>;

const SanityImage = ({ asset, alt, className, ...props }: SanityImageProps) => (
  <SanityImageComponent
    // Pass the Sanity Image ID (`_id`) (e.g., `image-abcde12345-1200x800-jpg`)
    {...props}
    id={asset?._id || asset?._ref || alt || 'image'}
    baseUrl={`https://cdn.sanity.io/images/${projectId}/${dataset}/`}
    className={className}
    alt={alt}
  />
);

export default SanityImage;
