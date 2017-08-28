require('dotenv').config()

const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema')
const webpackMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const port = process.env.PORT || 4000

const app = express()

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.use(webpackMiddleware(webpack(webpackConfig)))

app.listen(port, (error) => {
  if (error) {
    console.error(error) // eslint-disable-line no-console
  } else {
    console.info(`==> 🌎  Listening on port ${ port }. Open up http://localhost:${ port }/ in your browser.`) // eslint-disable-line no-console
  }
})
