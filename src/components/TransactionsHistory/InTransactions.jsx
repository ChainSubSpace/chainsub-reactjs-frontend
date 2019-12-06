import React from 'react'
import TransactionsHistory from './index'

const title = 'Incoming Turtle transactions'

const owner = slug => (slug ? 'ARTICLE' : 'USER')

export default ({ slug }) => (
  <TransactionsHistory title={title} type="IN" owner={owner(slug)} ownerId={slug} />
)
