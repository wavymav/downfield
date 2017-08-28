require('dotenv').config()
const queries = require('./queries')
const ApiUrl = process.env.API_URL

module.exports = {
  ApiUrl,
  queries
}
