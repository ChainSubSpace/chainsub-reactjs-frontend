import React from 'react'
import Helmet from 'react-helmet'

import {useQuery} from '@apollo/react-hooks'
import {get, startCase} from 'lodash-es'

import PostsList from './index'

import {GET_TAG_BY_SLUG} from '../../lib/backend-queries'

export default ({ slug }) => {
  const displayName = 'getTagBySlug'
  const { data } = useQuery(GET_TAG_BY_SLUG, { variables: { where: { slug } }, displayName })

  const pageTitle = startCase(get(data, 'tags[0].name'))

  return (
    <div className="blog">
      <Helmet title={`${pageTitle} Tag`} />
      <section className="container">
        <h1>
          Articles by <strong>#{pageTitle}</strong> tag.
        </h1>
        <PostsList displayName="getPostsByTag" where={{ tags: { slug } }} />
      </section>
    </div>
  )
}