export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  (import.meta && import.meta?.env?.SANITY_STUDIO_PROJECT_ID) ||
  '';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  (import.meta && import.meta?.env?.SANITY_STUDIO_DATASET) ||
  '';

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2022-11-15';
// useCdn == true gives fast, cheap responses using a globally distributed cache.
// It makes sense to use the CDN if the revalidation webhook isn't configured yet.
// When on-demand revalidation is enabled, prefer fresh reads over cached CDN data.
export const useCdn = process.env.REVALIDATION_TOKEN
  ? false
  : process.env.NODE_ENV === 'production';

// This is the document id used for the preview secret that's stored in your dataset.
// The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
export const previewSecretId = 'preview.secret';

export const token = process.env.SANITY_API_WRITE_TOKEN;
