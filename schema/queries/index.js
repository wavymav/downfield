require('dotenv').config()

const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const PlayerType = require('./PlayerType')
const CommentType = require('./CommentType')

const ApiUrl = process.env.API_URL

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    players: {
      type: new GraphQLList(PlayerType),
      resolve: () => (
        axios
          .get(`${ ApiUrl }/players`)
          .then(({ data }) => data)
      )
    },
    player: {
      type: PlayerType,
      args: { playerId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parentValue, { playerId }) => (
        axios
          .get(`${ ApiUrl }/players/${ playerId }`)
          .then(({ data }) => data)
      )
    },
    comment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parentValue, { id }) => (
        axios
          .get(`${ ApiUrl }/comments/${ id }`)
          .then(({ data }) => data)
      )
    }
  }
})

module.exports = {
  query
}
