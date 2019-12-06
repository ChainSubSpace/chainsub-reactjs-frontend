import React from 'react'

import { get } from 'lodash-es'

import { useQuery } from '@apollo/react-hooks'
import { GET_CURRENT_USER } from '../../lib/backend-queries'

import TransactionsListItem from './TransactionsListItem'

export default ({ transactions, total, onLoadMore, networkStatus, title }) => {
  const { data } = useQuery(GET_CURRENT_USER)

  const user = get(data, 'user.info', false)

  const itemsList = transactions.map(transaction => (
    <TransactionsListItem key={transaction.id} user={user} transaction={transaction} />
  ))

  return (
    <div className="page_item">
      <div className="title">
        {title}: [{total}]
      </div>
      <div className="content">
        {itemsList}

        {transactions.length < total && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className="btn small" type="button" onClick={() => onLoadMore()}>
              <div className="button__content">{networkStatus < 7 ? 'Loading' : 'Load More'}</div>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
