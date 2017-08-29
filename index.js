require('dotenv').config()

const express = require('express')
const expressGraphQL = require('express-graphql')
const httpProxy = require('http-proxy')
const schema = require('./schema')
const webpackMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const port = process.env.PORT || 4000
const isDevelopment = process.env.NODE_ENV !== "production"
// const apiUrl = process.env.API_URL

const app = express()
// const apiProxy = httpProxy.createProxyServer()

// app.all('/api/*', (req, res) => {
//   apiProxy.web(req, res, {
//     target: apiUrl
//   })
// })

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: isDevelopment
}))


app.use(webpackMiddleware(webpack(webpackConfig)))


app.listen(port, (error) => {
  if (error) {
    console.error(error) // eslint-disable-line no-console
  } else {
    console.info(`==> 🌎  Listening on port ${ port }. Open up http://localhost:${ port }/ in your browser.`) // eslint-disable-line no-console
  }
})
