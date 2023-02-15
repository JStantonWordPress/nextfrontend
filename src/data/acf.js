import { gql } from '@apollo/client';

export const ABOUT_TEMPLATE = gql`
query AboutACF ($ID: ID!) {
  page(id: $ID) {
    hero: acfhero {
      copy
      title
      cta {
         title
         url
      }
      backgroundImage {
        sourceUrl
        mediaItemUrl
      }
    }
    about: templateAbout {
      aboutCopy
      aboutImage {
        sourceUrl
        mediaItemUrl
      }
    }
  }
}
`;