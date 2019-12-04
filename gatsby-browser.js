import React from 'react'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

import { createPersistedQueryLink } from 'apollo-link-persisted-queries'

import { ApolloProvider } from '@apollo/react-hooks'

import {
  InMemoryCache,
  defaultDataIdFromObject,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'

import { GET_CURRENT_USER } from './src/lib/backend-queries'

const fetch = require('isomorphic-unfetch')

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      categories: (_, args, { getCacheKey }) =>
        args && args.where
          ? [getCacheKey({ __typename: 'BlogCategory', slug: args.where.slug })]
          : false,
      tags: (_, args, { getCacheKey }) => [
        getCacheKey({ __typename: 'BlogTag', slug: args.where.slug })
      ],
      authors: (_, args, { getCacheKey }) => [
        getCacheKey({ __typename: 'BlogAuthor', slug: args.where.slug })
      ]
    }
  },
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'BlogTag':
        return `BlogTag:${object.slug}`
      case 'BlogCategory':
        return `BlogCategory:${object.slug}`
      case 'BlogAuthor':
        return `BlogAuthor:${object.slug}`
      default:
        return defaultDataIdFromObject(object) // fall back to default handling
    }
  },
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: []
      }
    }
  })
})

persistCache({ cache, storage: window.localStorage })

const httpLink = createHttpLink({
  // uri: 'http://178.47.142.217:1337/graphql',
  uri: 'https://backend.chainsub.space/gql',
  fetch
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt')

  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } }
})

const mylink = createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
  authLink.concat(httpLink)
)
const client = new ApolloClient({
  link: mylink,
  // link: authLink.concat(httpLink),
  cache,
  resolvers: {
    Query: { user: async user => null },
    UsersPermissionsLoginPayload: {
      isLoggedIn: (login, _, { cache }) => {
        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: { user: { ...login, isLoggedIn: !!login.jwt } }
        })

        localStorage.setItem('jwt', login.jwt)

        return !!login.jwt
      }
    }
  }
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
