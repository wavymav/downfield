const axios = require('axios')
const { ApiUrl } = require('./index')

const getPlayerComments = (id) => (
  axios
    .get(`${ ApiUrl }/players/${ id }/comments`)
    .then(({ data }) => data)
)

const getPlayer = (playerId) => (
  axios
    .get(`${ ApiUrl }/players/${ playerId }`)
    .then(({ data }) => data)
)

module.exports = {
  getPlayer,
  getPlayerComments,
}
