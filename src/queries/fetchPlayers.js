import gql from 'graphql-tag'

export const fetchPlayers = gql`{
  players {
    id
    firstName
    lastName
    jerseyNumber
    position
    team
    commentsCount
  }
}`
