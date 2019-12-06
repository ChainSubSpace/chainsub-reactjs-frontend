import React from 'react'
import Helmet from 'react-helmet'
import { get } from 'lodash-es'

import { useQuery } from '@apollo/react-hooks'
import { GET_BALANCE, GET_POST_BY_SLUG } from '../../lib/backend-queries'

import Post from './Post'
import PostInfo from './PostInfo'
import Markdown from './Markdown'
import Wallet from '../wallet/Wallet'

import InTransactions from '../TransactionsHistory/InTransactions'
import OutTransactions from '../TransactionsHistory/OutTransactions'

export default ({ slug }) => {
  const { data, networkStatus } = useQuery(GET_POST_BY_SLUG, {
    variables: { slug, cache: true },
    displayName: 'getPostBySlug',
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  })

  const balance = useQuery(GET_BALANCE, {
    displayName: 'getBalance',
    fetchPolicy: 'cache-only'
  })

  const turtleBalance = get(balance, 'data.balance.turtle', { unlockedBalance: 0 })

  const post = get(data, 'postData.post', null)
  const wallet = get(data, 'postData.wallet', null)

  if (networkStatus < 7 && !post) return null

  return (
    <div className="blog">
      <Helmet title={post.title} />
      <section className="container">
        <Markdown markdown={`# ${post.title}`} />
        <div className="page_item">
          <PostInfo post={post} totalReceived={wallet.totalReceived} />
          <Post post={post} />
        </div>

        <div className="page_item">
          <div className="title">Article's TRTL wallet:</div>
          <div className="content">
            <Wallet wallet={wallet} userBalance={turtleBalance} postSlug={post.slug} />
          </div>
        </div>
          <InTransactions slug={post.slug} />
          <OutTransactions slug={post.slug} />
      </section>
    </div>
  )
}