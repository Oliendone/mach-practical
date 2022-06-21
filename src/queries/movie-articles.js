import gql from "graphql-tag";

export const MOVIE_ARTICLES_QUERY = gql`
  query Articles {
    all_movie_article {
      items {
        title
        imageConnection {
          edges {
            node {
              url
            }
          }
        }
        date
        url
        system {
          uid
        }
      }
    }
  }
`;
