import app from 'ampersand-app'
import Router from 'ampersand-router'
import React from 'react'
import qs from 'qs'
import xhr from 'xhr'
import { render } from 'react-dom'
import Layout from './layout'
import ReposPage from './pages/repos'
import RepoDetail from './pages/repo-detail'
import PublicPage from './pages/public'
import MessagePage from './pages/message'
import config from './config'

function requiresAuth (handlerName) {
  return function () {
    if (app.me.token) {
      this[handlerName].apply(this, arguments)
    } else {
      this.redirectTo('/')
    }
  }
}

export default Router.extend({
  renderPage (page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout me={app.me}>
          {page}
        </Layout>
      )
    }

    render(page, root)
  },

  routes: {
    '': 'public',
    'repos': requiresAuth('repos'),
    'login': 'login',
    'logout': 'logout',
    'repo/:owner/:name': requiresAuth('repoDetail'),
    'auth/callback?:query': 'authCallback',
    '*fourOhFour': 'fourOhFour'
  },

  public () {
    this.renderPage(<PublicPage />, {layout: false})
  },

  repos () {
    this.renderPage(<ReposPage repos={app.me.repos} labels={app.me.label} />)
  },

  repoDetail (owner, name) {
    const model = app.me.repos.getByFullName(owner + '/' + name)
    this.renderPage(<RepoDetail repo={model} labels={model.labels} />)
  },

  login () {
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: config.clientId,
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user,repo'
    })
  },

  authCallback (query) {
    query = qs.parse(query)

    xhr({
      url: config.authUrl + '/' + query.code,
      json: true
    }, (err, req, body) => {
      app.me.token = body.token
      this.redirectTo('/repos')
    })

    this.renderPage(<MessagePage title='Fetching your data...' />)
  },

  logout () {
    window.localStorage.clear()
    window.location = '/'
  },

  fourOhFour () {
    this.renderPage(<MessagePage title='Not Found' body="Nothing's here" />)
  }
})
