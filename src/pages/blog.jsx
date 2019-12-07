import React from 'react'
import { Router, Location } from '@reach/router'

import Layout from '../components/Layout'

import PostsByAuthor from '../components/PostsList/PostsByAuthor'
import PostsByCategory from '../components/PostsList/PostsByCategory'
import PostsByTag from '../components/PostsList/PostsByTag'
import Post from '../components/Post'

const App = () => (
  <Location>
    {({ location }) => (
      <Layout location={location}>
        <Router location={location} className="router" >
          <PostsByAuthor path="/blog/author/:slug" />
          <PostsByCategory path="/blog/category/:slug" />
          <PostsByTag path="/blog/tag/:slug" />
          <Post path="blog/:slug" location={location} />
        </Router>
      </Layout>
    )}
  </Location>
)




export default App

