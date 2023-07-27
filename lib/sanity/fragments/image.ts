import { groq } from 'next-sanity';

export const imageQuery = `
  "_ref": asset._ref,
  "alt": asset->altText,
  "preview": asset->metadata.lqip,
  "description": asset->description,
  hotspot { x, y },
  crop {
    bottom,
    left,
    right,
    top,
  },
`;

const image = groq`image {${imageQuery}}`;

export default image;
