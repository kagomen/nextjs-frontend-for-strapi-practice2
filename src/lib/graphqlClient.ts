// libディレクトリ: 外部との通信に依存しない、内部で再利用するコードを置く
import { GraphQLClient } from "graphql-request"
import { graphqlApiUrl, strapiApiToken } from "../constants/constants"

export const graphqlClient = new GraphQLClient(
  graphqlApiUrl,
  strapiApiToken
    ? {
        headers: {
          Authorization: `Bearer ${strapiApiToken}`,
        },
      }
    : undefined
)
