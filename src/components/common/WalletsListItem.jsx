import React from 'react'
import { Link } from 'gatsby'

export default ({ wallet, type }) => (
  <div className="blog__post_item" key={wallet.id}>
    {(type === 'article') && <Link to={`/blog/${wallet.articleSlug}`}><div>articleTitle:{wallet.articleTitle}</div></Link>}
    <div>address:{wallet.address}</div>
    <div>lockedBalance:{wallet.lockedBalance}</div>
    <div>unlockedBalance:{wallet.unlockedBalance}</div>
    <div>totalReceived:{wallet.totalReceived}</div>
    <div>totalSent:{wallet.totalSent}</div>
  </div>
)
