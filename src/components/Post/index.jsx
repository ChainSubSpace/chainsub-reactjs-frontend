import React from 'react'
import Helmet from 'react-helmet'
import { get } from 'lodash-es'

import {useLazyQuery, useQuery} from '@apollo/react-hooks'
import {GET_BALANCE, GET_POST_BY_SLUG} from '../../lib/backend-queries'

import Post from './Post'
import PostInfo from './PostInfo'
import Markdown from './Markdown'
import Wallet from '../wallet/Wallet'
import TransactionItem from '../wallet/TransactionItem'


export default ({ slug }) => {
  const { data, networkStatus } = useQuery(GET_POST_BY_SLUG, {
    variables: { slug, cache: true },
    displayName: 'getPostBySlug',
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  })

  const balance  = useQuery(GET_BALANCE, {
    displayName: 'getBalance',
    fetchPolicy: 'cache-only'
  })

  const turtleBalance = get(balance, 'data.balance.turtle', {unlockedBalance:0})



  const post = get(data, 'postData.post', null)
  const inTransactions = get(data, 'postData.transactions.in', null)
  const wallet = get(data, 'postData.wallet', null)

  if (networkStatus < 7 && !post) return null

  return (
    <div className="blog">
      <Helmet title={post.title} />
      <section className="container">
        <Markdown markdown={`# ${post.title}`} />
        <div className="blog__content">
          <PostInfo post={post} totalReceived={wallet.totalReceived} />
          <Post post={post} />
        </div>
        <div className="blog__content">
          <div className="block_header">Article's TRTL wallet:</div>
          <Wallet wallet={wallet} userBalance={turtleBalance}  />
        </div>
        <div className="blog__content">
          <div className="block_header">
            Incoming Turtle transactions: [{inTransactions.length}]
          </div>
          {inTransactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </section>
    </div>
  )
}
