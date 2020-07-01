import gql from "graphql-tag";

export const FIND_SIGHTINGS = gql`
  query {
    sightings(query: { isApproved: true }, limit: 3, sortBy: SEENDATE_DESC) {
      _id
      description
      imageUrl
      isApproved
      seenDate
      submitDate
      witness
      location {
        lat
        lng
      }
    }
  }
`;

export const FIND_MOVIE = gql`
  query FindMovie($query: MovieQueryInput!) {
    movie(query: $query) {
      _id
      title
      year
      runtime
      rated
      poster
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($query: MovieQueryInput!, $set: MovieUpdateInput!) {
    updateOneMovie(query: $query, set: $set) {
      _id
      title
    }
  }
`;