import React from 'react'
import TransactionsHistory from './index'

const title = 'Outgoing Turtle transactions'

const owner = slug => (slug ? 'ARTICLE' : 'USER')

export default ({ slug }) => (
  <TransactionsHistory title={title} type="OUT" owner={owner(slug)} ownerId={slug} />
)
