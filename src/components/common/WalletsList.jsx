import React from 'react'

import WalletsListItem from './WalletsListItem'

export default ({ articlesWalletsTurtle, mainWalletTurtle }) => {
  console.log(mainWalletTurtle)

  return (
    <div className="wallets_block">
      {mainWalletTurtle.map(wallet => (
        <WalletsListItem key={wallet.id} wallet={wallet} type="main" />
      ))}
      {articlesWalletsTurtle.map(wallet => (
        <WalletsListItem key={wallet.id} wallet={wallet} type="article" />
      ))}
    </div>
  )
}
