import React, { useMemo } from 'react'
import Helmet from 'react-helmet'
import { get } from 'lodash-es'

import { useQuery } from '@apollo/react-hooks'
import { GET_WALLETS } from '../../lib/backend-queries'

import WalletsList from './WalletsList'

export default ({ user }) => {
  const { data, networkStatus } = useQuery(GET_WALLETS, {
    displayName: 'walletsList',
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  })

  if (networkStatus < 7 && !get(data, 'wallets')) return null

  return (
      <div className="blog">
        <Helmet title="My wallets" />
        <section className="container">
          <h1>
            The list of <strong>{user.username}</strong> wallets.
          </h1>
          <WalletsList {...data.wallets} />
        </section>
      </div>
    )
}
