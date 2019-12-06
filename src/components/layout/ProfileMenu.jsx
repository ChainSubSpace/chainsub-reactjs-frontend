import React, { useState, useEffect } from 'react'
import { get } from 'lodash-es'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Link, navigate } from 'gatsby'
import { GET_CURRENT_USER, GET_BALANCE } from '../../lib/backend-queries'

import { prettyPrintAmount, ssr } from '../../lib/helpers'

export default () => {
  if (ssr) return null

  const [showMenu, setShowMenu] = useState(false)

  const { data: user, client } = useQuery(GET_CURRENT_USER)

  const [getBalance, balance] = useLazyQuery(GET_BALANCE, {
    displayName: 'getBalance',
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  })

  const info = get(user, 'user.info', null)
  const turtleBalance = get(balance, 'data.balance.turtle', { unlockedBalance: 0 })

  useEffect(() => {
    if (info) getBalance()
  }, [info, getBalance])

  if (!info)
    return (
      <div className="user__signin">
        <Link to="/auth/signin">Sign in</Link>
      </div>
    )

  const signOut = event => {
    event.preventDefault()
    localStorage.removeItem('jwt')
    client.resetStore()
    navigate('/')
  }

  return (
    <div className="profile__menu">
      <span className="user_icon" onClick={() => setShowMenu(!showMenu)}>
        {info.username.charAt(0).toUpperCase()}
      </span>
      <div className="user_menu" style={{ height: showMenu ? '440px' : '0px' }}>
        <div className="user_menu_wrapper">
          <div className="user_name">@{info.username}</div>
          <div className="balance">
            <div>
              <strong>AB:</strong> {prettyPrintAmount(turtleBalance.unlockedBalance)}
            </div>
            <div>
              <strong>LB:</strong> {prettyPrintAmount(turtleBalance.lockedBalance)}
            </div>
          </div>

          <ul>
            <li>
              <Link to="/user/article/create">New story</Link>
            </li>
            <li>
              <Link to="/user/articles">Stories</Link>
            </li>
            <li>
              <Link to="/user/stats">Stats</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/user/wallets">Wallets</Link>
            </li>
            <li>
              <Link to="/user/main/wallet">History</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/user/profile">Profile</Link>
            </li>
            <li>
              <Link to="/user/settings">Settings</Link>
            </li>
            <li>
              <a onClick={signOut} href="/">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
