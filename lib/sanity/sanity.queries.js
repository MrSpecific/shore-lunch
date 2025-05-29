import { groq } from 'next-sanity';
import image, { imageQuery } from './fragments/image';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    ...,
    navigation[]{
      ...,
      'link': link[0]->{ 'url': slug.current },
      mainLink{
        ...,
        'link': link[0]->{ 'url': slug.current },
      },
      linkList[]{
        ...,
        'link': link[0]->{ 'url': slug.current, _type },
      }
    },
  }
`;

export const productsQuery = groq`
  *[_type == "product"]{
    ...
  }
`;

export const availableProductsQuery = groq`
  *[_type == "product" && available == true]{
    ...,
    "id": _id,
    "name": title
  }
`;

// export const productsQuery = groq`;
//   *[_type == "product"]{
//     ...
//     'link': link[0]->{ 'url': slug.current, _type },
//   }
// `;

export const collectionQuery = groq`
  *[_type == "productCollection"][0]{
    ...,
    sections[]{
      ...,
      products[]->
    }
  }
`;
export const homePageQuery = groq`
  *[_type == "frontPage"][0] {
    _id,
    hero {
      ...,
      ${image}
    },
    heroMobile {
      ${imageQuery}
    }
  }
`;

export const pagePathsQuery = groq`*[_type == "page" && defined(slug.current)][].slug.current`;

export const dynamicPageQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  template,
  hero,
  blocks[]{
    ...,
    image {
      ...,
      asset->{
        ...,
        metadata
      }
    }
  },
  "slug": slug.current
}
`;

const episodeFragment = `
...,
"slug": slug.current
`;

export const episodePathsQuery = groq`*[_type == "episode" && defined(slug.current)][].slug.current`;

export const episodeQuery = groq`
*[_type == "episode" && slug.current == $slug][0] {
  ${episodeFragment}
}
`;

export const allEpisodesQuery = groq`
*[_type == "episode"] | order(episodeNumber desc) {
  ${episodeFragment}
}
`;

export const recipeQuery = groq`
*[_type == "recipe" && slug.current == $slug][0] {
  ...
}
`;

export const recipePathsQuery = groq`*[_type == "recipe" && defined(slug.current)][].slug.current`;
