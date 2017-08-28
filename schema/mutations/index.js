require('dotenv').config()

const axios = require('axios')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} = graphql
const PlayerType = require('./PlayerType')
const CommentType = require('./CommentType')

const ApiUrl = process.env.API_URL

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPlayer: {
      type: PlayerType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        jerseyNumber: { type: new GraphQLNonNull(GraphQLInt) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        team: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, {
        firstName,
        lastName,
        jerseyNumber,
        position,
        team
      }) => (
        axios
          .post(`${ ApiUrl }/players`, {
            firstName,
            lastName,
            jerseyNumber,
            position,
            team
          })
          .then(({ data }) => data)
      )
    },
    createComment: {
      type: CommentType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        playerId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parentValue, { playerId, content }) => (
        axios
          .post(`${ ApiUrl }/players/${ playerId }/comments`, {
            content
          })
          .then(({ data }) => data)
      )
    },
    editUser: {
      type: PlayerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        jerseyNumber: { type: new GraphQLNonNull(GraphQLInt) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        team: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, {
        id,
        firstName,
        lastName,
        jerseyNumber,
        position,
        team
      }) => (
        axios
          .patch(`${ ApiUrl }/players/${ id }`, {
            id,
            firstName,
            lastName,
            jerseyNumber,
            position,
            team
          })
          .then(({ data }) => data)
        )
    },
    deletePlayer: {
      type: PlayerType,
      args: { type: new GraphQLNonNull(GraphQLID) },
      resolve: (parentValue, { id }) => (
        axios
          .delete(`${ ApiUrl }/players/${ id }`)
          .then(({ data }) => data)
      )
    }
  }
});

module.exports = mutation
