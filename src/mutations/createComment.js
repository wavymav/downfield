import gql from 'graphql-tag'

export const createComment = gql`
  mutation CreateComment($playerId: ID!, $content: String!) {
    createComment(content: $content, playerId: $playerId) {
    	id
    	content
    }
  }
`
