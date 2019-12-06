import React from 'react'
import { Router, Location } from '@reach/router'
import { navigate } from 'gatsby'

import { get } from 'lodash-es'

import { useQuery } from '@apollo/react-hooks'
import { GET_CURRENT_USER } from '../lib/backend-queries'

import { ssr } from '../lib/helpers'

import Layout from '../components/Layout'
import PostsByAuthor from '../components/PostsList/PostsByAuthor'

import ArticleTransactionsHistory
  from '../components/TransactionsHistory/ArticleTransactionsHistory'

import UserTransactionsHistory from '../components/TransactionsHistory/UserTransactionsHistory'
import Wallets from '../components/common/Wallets'

import WIP from '../components/common/WIP'

// The slate is crashing on SSR so...
const EditPost = (ssr) ? null : require('../components/common/EditPost').default
const CreatePost = (ssr) ? null : require('../components/common/CreatePost').default

const useUser = () => {
  const { data } = useQuery(GET_CURRENT_USER)
  return get(data, 'user.info', false)
}

export default () => {
  if (ssr) return null

  const user = useUser()

  if (!user) {
    navigate('/auth/signin')
    return null
  }

  return (
    <Location>
      {({ location }) => (
        <Layout location={location}>
          <Router location={location} className="router">
            <PostsByAuthor credentialsId={user.id} path="/user/articles" />
            <CreatePost user={user} path="/user/article/create" />
            <EditPost user={user} path="/user/article/edit/:id" />
            <Wallets user={user} path="/user/wallets" />
            <ArticleTransactionsHistory path="/user/article/wallet/history/:slug" />
            <UserTransactionsHistory user={user} path="/user/main/wallet" />
            <WIP  path="/user/stats" />
            <WIP  path="/user/profile" />
            <WIP  path="/user/settings" />
          </Router>
        </Layout>
      )}
    </Location>
  )
}
