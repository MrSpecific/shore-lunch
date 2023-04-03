import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '@lib/sanity';

/* Sanity image is more convenient than Next's tbh
e.g. auto('format') results in webp format (if the browser supports it)
https://github.com/sanity-io/image-url
https://www.sanity.io/docs/image-url
https://www.sanity.io/docs/image-urls#fit-object-object
Lazy load concept: https://gist.github.com/kmelve/e047d40e24d92f1b4751535a4cee1e59
*/

export const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source) => {
  return source ? imageBuilder.image(source) : '';
};
