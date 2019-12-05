import React from 'react'

import WalletsListItem from './WalletsListItem'

import Wallet from '../wallet/Wallet'
import { Link } from 'gatsby'

export default ({ articlesWalletsTurtle, mainWalletTurtle }) => {
  return (
    <div className="wallets_block">
      {mainWalletTurtle.map(wallet => (
        <div className="page_item" key={wallet.id}>
          <div className="title">Main TRTL wallet:</div>
          <div className="content">
            <Wallet key={wallet.id} wallet={wallet} userBalance={wallet} type="main" />
          </div>
        </div>
      ))}
      {articlesWalletsTurtle.map(wallet => (
        <div className="page_item" key={wallet.id}>
          <div className="title">
            <Link to={`/blog/${wallet.articleSlug}`}>{wallet.articleTitle}:</Link>
          </div>
          <div className="content">
            <Wallet key={wallet.id} wallet={wallet} userBalance={wallet} type="article" />
          </div>
        </div>
      ))}
    </div>
  )
}
