const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = require('graphql')
const { getPlayerComments } = require('../api')

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
        getPlayerComments(id)
      )
    }
  })
})

module.exports = PlayerType
