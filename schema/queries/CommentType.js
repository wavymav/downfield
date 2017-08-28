
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = require('graphql')
const { getPlayer } = require('../api')

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    playerId: { type: GraphQLID },
    Player: {
      type: require('./PlayerType'),
      resolve: ({ playerId }, args) => ( // eslint-disable-line no-unused-vars
        getPlayer(playerId)
      )
    }
  })
})

module.exports = CommentType
