import gql from 'graphql-tag'

export const fetchPlayer = gql`
  query PlayerQuery($playerId: ID!) {
    player(playerId: $playerId) {
      id
      firstName
      lastName
      jerseyNumber
      position
      team
      comments {
        id
        content
        playerId
      }
    }
  }
`
