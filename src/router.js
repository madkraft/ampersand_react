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

const root = document.getElementById('root')

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
    'repos': 'repos',
    'login': 'login',
    'logout': 'logout',
    'repo/:owner/:name': 'repoDetail',
    'auth/callback?:query': 'authCallback'
  },

  public () {
    this.renderPage(<PublicPage />, {layout: false})
  },

  repos () {
    this.renderPage(<ReposPage repos={app.me.repos} />)
  },

  repoDetail (owner, name) {
    const model = app.me.repos.getByFullName(owner + '/' + name)
    this.renderPage(<RepoDetail repo={model} />)
  },

  login () {
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: '13ce25598a0e19261ce5',
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user,repo'
    })
  },

  authCallback (query) {
    query = qs.parse(query)

    xhr({
      url: 'https://hubtags-learn.herokuapp.com/authenticate/' + query.code,
      json: true
    }, (err, req, body) => {
      app.me.token = body.token
      this.redirectTo('/repos')
    })
  },

  logout () {
    window.localStorage.clear()
    window.location = '/'
  }
})
