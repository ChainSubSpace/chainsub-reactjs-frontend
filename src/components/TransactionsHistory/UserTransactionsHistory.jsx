import React from 'react'
import Helmet from 'react-helmet'


import InTransactions from './InTransactions'
import OutTransactions from './OutTransactions'

export default ({ user }) => (
  <div className="blog">
    <Helmet title="hello" />
    <section className="container">
      <h1>
        {user.username} main wallet <strong>transactions</strong> history.
      </h1>
      <InTransactions />
      <OutTransactions />
    </section>
  </div>
)
