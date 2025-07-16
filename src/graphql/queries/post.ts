import { gql } from "graphql-request"

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      documentId
      title
    }
  }
`

export const GET_POST = gql`
  query GetPost($documentId: ID!) {
    post(documentId: $documentId) {
      documentId
      title
      content
      publishedAt
    }
  }
`
