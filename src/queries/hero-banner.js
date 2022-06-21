import gql from "graphql-tag";

export const HERO_BANNER_QUERY = gql`
  query HeroBanner($locale: String!, $uid: String!) {
    hero_banner(locale: $locale, uid: $uid) {
      title
      description
      select_banner_variant
      background_imageConnection {
        edges {
          node {
            url
          }
        }
      }
    }
  }
`;
