import React, { Fragment } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { GET_TRANSACTIONS } from '../../lib/backend-queries'

import { ssr } from '../../lib/helpers'

import TransactionsList from './TransactionsList'

export default ({ limit = 4, displayName, type, owner, ownerId, title }) => {
  if (ssr) return null

  const { data, fetchMore, networkStatus } = useQuery(GET_TRANSACTIONS, {
    variables: {
      start: 0,
      limit,
      type,
      owner,
      ownerId
    },
    displayName,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  })

  return (
    <Fragment>
      {data && data.transactions ? (
        <TransactionsList
          title={title}
          transactions={data.transactions.transactions || []}
          total={data.transactions.total}
          networkStatus={networkStatus}
          onLoadMore={() =>
            fetchMore({
              variables: {
                start: data.transactions.transactions.length
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                console.log({
                  transactions: [
                    ...prev.transactions.transactions,
                    ...fetchMoreResult.transactions.transactions
                  ]
                })
                return Object.assign({}, prev, {
                  transactions: {
                    ...prev.transactions,
                    ...fetchMoreResult.transactions,
                    transactions: [
                      ...prev.transactions.transactions,
                      ...fetchMoreResult.transactions.transactions
                    ]
                  }
                })
              }
            })
          }
        />
      ) : (
        <div>Loading</div>
      )}
    </Fragment>
  )
}
