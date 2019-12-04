import React from 'react'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

import { ApolloProvider } from '@apollo/react-hooks'

import { InMemoryCache } from 'apollo-cache-inmemory'

import { GET_CURRENT_USER } from './src/lib/backend-queries'

const fetch = require('isomorphic-unfetch')

const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: 'https://backend.chainsub.space/gql',
  fetch
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  ssrMode: true,
  link: authLink.concat(httpLink),
  cache,
  resolvers: {
    Query: { user: async user => null },
    UsersPermissionsLoginPayload: {
      isLoggedIn: (login, _, { cache }) => {
        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: { user: { ...login, isLoggedIn: !!login.jwt } }
        })
        return !!login.jwt
      }
    }
  }
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
