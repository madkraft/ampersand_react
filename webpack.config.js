require('babel-core/register')
var getConfig = require('hjs-webpack')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var PublicPage = require('./src/pages/public').default
var LayoutPage = require('./src/layout').default

module.exports = getConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  isDev: process.env.NODE_ENV !== 'production',
  html: function (context) {
    const publicElement = React.createElement(PublicPage)
    const layoutElement = React.createElement(LayoutPage, {me: {}})
    const publicPage = ReactDOMServer.renderToString(publicElement)
    const layoutPage = ReactDOMServer.renderToString(layoutElement)

    return {
      'index.html': context.defaultTemplate({html: publicPage}),
      '200.html': context.defaultTemplate({html: layoutPage})
    }
  }
})
