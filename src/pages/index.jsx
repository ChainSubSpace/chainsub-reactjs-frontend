import React from 'react'

import Layout from '../components/Layout'
import PostsByDate from '../components/PostsList/PostsByDate'

export default ({ location }) => (
  <Layout location={location}>
    <PostsByDate />
  </Layout>
)
