import React from 'react'
import Helmet from 'react-helmet'


import InTransactions from './InTransactions'
import OutTransactions from './OutTransactions'

export default ({ user }) => (
  <div className="blog">
    <Helmet title="Transactions history" />
    <section className="container">
      <h1>
        {user.username} Main wallet <strong>transaction</strong> history.
      </h1>
      <InTransactions />
      <OutTransactions />
    </section>
  </div>
)
