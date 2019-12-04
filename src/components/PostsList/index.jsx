import React, { Fragment } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { GET_POSTS } from '../../lib/backend-queries'

import { ssr } from '../../lib/helpers'

import PostsList from './PostsList'

export default ({ limit = 2, displayName, where }) => {
  if (ssr) return null



  const { data, fetchMore, networkStatus } = useQuery(GET_POSTS, {
    variables: {
      start: 0,
      limit,
      where
    },
    displayName,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  })

  return (
    <Fragment>
      {data && data.posts ? (
        <PostsList
          posts={data.posts || []}
          total={data.items.total.count}
          networkStatus={networkStatus}
          onLoadMore={() =>
            fetchMore({
              variables: {
                start: data.posts.length
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                return Object.assign({}, prev, {
                  posts: [...prev.posts, ...fetchMoreResult.posts]
                })
              }
            })
          }
        />
      ) : (
        <div>Loading</div>
      )}
    </Fragment>
  )
}
