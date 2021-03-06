import React, { Fragment } from 'react'

import { get } from 'lodash-es'

import { useQuery } from '@apollo/react-hooks'
import { GET_CURRENT_USER } from '../../lib/backend-queries'

import PostsListItem from './PostsListItem'

export default ({ posts, total, onLoadMore, networkStatus }) => {
  const { data } = useQuery(GET_CURRENT_USER)

  const user = get(data, 'user.info', false)

  const itemsList = posts.map(post => <PostsListItem key={post.id} user={user} post={post} />)

  return (
    <Fragment>
      {itemsList}

      {posts.length < total && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="btn small" type="button" onClick={() => onLoadMore()}>
            <div className="button__content">{networkStatus < 7 ? 'Loading' : 'Load More'}</div>
          </button>
        </div>
      )}
    </Fragment>
  )
}
