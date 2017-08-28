require('dotenv').config()

const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = require('graphql')

const ApiUrl = process.env.API_URL

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    jerseyNumber: { type: GraphQLInt },
    position: { type: GraphQLString },
    team: { type: GraphQLString },
    comments: {
      type: new GraphQLList(require('./CommentType')),
      resolve: ({ id }, args) => ( // eslint-disable-line no-unused-vars
        axios
          .get(`${ ApiUrl }/players/${ id }/comments`)
          .then(({ data }) => data)
      )
    }
  })
})

module.exports = PlayerType
