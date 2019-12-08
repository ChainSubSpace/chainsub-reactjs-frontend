import React from 'react'
import Helmet from 'react-helmet'

import PostsList from './index'

export default () => (
    <div className="blog">
      <Helmet title="Publishing platform" />
      <section className="container">
        <h1>
          <strong>Recent</strong> posts.
        </h1>
        <PostsList displayName="GetPostsByDate" limit={4} />
      </section>
    </div>
)