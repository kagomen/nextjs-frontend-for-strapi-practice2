import { gql } from "graphql-request"

export const GET_POSTS = gql`
  query GetPosts($page: Int, $pageSize: Int) {
    posts_connection(pagination: { page: $page, pageSize: $pageSize }) {
      nodes {
        documentId
        title
      }
      pageInfo {
        page
        pageSize
        pageCount
        total
      }
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
