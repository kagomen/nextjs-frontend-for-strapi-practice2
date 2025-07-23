import { gql } from "graphql-request"

// 大文字小文字の区別をしないタイトル検索
export const GET_POSTS = gql`
  query GetPosts($page: Int, $pageSize: Int, $searchText: String) {
    posts_connection(
      pagination: { page: $page, pageSize: $pageSize }
      filters: { title: { containsi: $searchText } }
    ) {
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
