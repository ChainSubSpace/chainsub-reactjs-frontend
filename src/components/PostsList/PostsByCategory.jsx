import React from 'react'
import Helmet from 'react-helmet'

import {useQuery} from '@apollo/react-hooks'
import {get, startCase} from 'lodash-es'

import PostsList from './index'

import {GET_CATEGORY_BY_SLUG} from '../../lib/backend-queries'

export default ({ slug }) => {
  const displayName = 'getCategoryBySlug'
  const { data } = useQuery(GET_CATEGORY_BY_SLUG, { variables: { where: { slug } }, displayName })

  const pageTitle = startCase(get(data, 'categories[0].name'))

  return (
    <div className="blog">
      <Helmet title={`${pageTitle} Category`} />
      <section className="container">
        <h1>
          Articles in <strong>{pageTitle}</strong> category.
        </h1>
        <PostsList displayName="getPostsByCategory" where={{ category: { slug } }} />
      </section>
    </div>
  )
}