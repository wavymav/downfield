require('dotenv').config()

const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = require('graphql')

const ApiUrl = process.env.API_URL

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    playerId: { type: GraphQLID },
    player: {
      type: require('./PlayerType'),
      resolve: ({ playerId }, args) => ( // eslint-disable-line no-unused-vars
        axios
          .get(`${ ApiUrl }/players/${ playerId }`)
          .then(({ data }) => data)
      )
    }
  })
})

module.exports = CommentType
