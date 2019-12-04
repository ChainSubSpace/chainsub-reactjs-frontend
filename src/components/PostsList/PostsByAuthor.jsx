import React from 'react'
import Helmet from 'react-helmet'

import {useQuery} from '@apollo/react-hooks'
import {get} from 'lodash-es'

import PostsList from './index'

import {GET_AUTHOR_BY_SLUG} from '../../lib/backend-queries'

export default ({ slug, credentialsId }) => {

  const clause = (credentialsId) ? { credentials: {_id:credentialsId} } : { slug }
  const where = (credentialsId) ? { author: clause } : { author: clause }

  const displayName = 'getAuthorBySlug'
  const { data } = useQuery(GET_AUTHOR_BY_SLUG, { variables: { where: clause }, displayName })

  const pageTitle = get(data, 'authors[0].username')

  return (
    <div className="blog">
      <Helmet title={`${pageTitle} Category`} />
      <section className="container">
        <h1>
          Articles from <strong>{pageTitle}</strong>.
        </h1>
        <PostsList displayName="getPostsByAuthor" where={where} />
      </section>
    </div>
  )
}