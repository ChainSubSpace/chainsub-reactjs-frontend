import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import Schema from '../components/home/Schema'

import { schema, schemaConfig } from '../data/schema-roadmap'
import WIP from '../components/common/WIP'
export default ({ location }) => {
  return (
    <Layout location={location}>
      <div className="roadmap">
        <Helmet title="Roadmap" />
        <Schema schema={schema} config={schemaConfig} />
      </div>
    </Layout>
  )
}
