import React from 'react'
import Helmet from 'react-helmet'


import InTransactions from './InTransactions'
import OutTransactions from './OutTransactions'

export default ({ slug }) => (
  <div className="blog">
    <Helmet title="hello" />
    <section className="container">
      <h1>
        Article <strong>transactions</strong> history.
      </h1>
      <InTransactions slug={slug} />
      <OutTransactions slug={slug} />
    </section>
  </div>
)
