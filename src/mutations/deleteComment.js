import gql from 'graphql-tag'

export const deleteComment = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`
