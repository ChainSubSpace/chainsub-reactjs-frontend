import React, { useRef, useEffect } from 'react'

const {
  projectGithub,
  siteMetadata: { twitter }
} = require('../../../config')

export default () => {
  const twitterButton = useRef(null)

  useEffect(() => {
    const createWidget = () => {
      twttr.widgets.createFollowButton(twitter, twitterButton.current, {
        size: 'medium',
        showScreenName: false
      })
    }

    if (twttr.widgets) {
      createWidget()
    } else {
      twttr.ready(createWidget)
    }
  }, [])

  return (
    <footer className="footer openable">
      <img className="footer__logo" src={`/logo.svg`} alt="site logo" width="300" />
      <p className="footer__copyright">
        Copyright © 2019{' '}
        <a href="https://github.com/n8tb1t" target="_blank" rel="noopener noreferrer">
          N8tb1t
        </a>
        {' '}
        <a href="https://github.com/hooftly" target="_blank" rel="noopener noreferrer">
          Hooftly
        </a>
      </p>
      <p className="footer__sponsored">
        Inspired by{' '}
        <a href="https://crypto-hackathon.com/" target="_blank" rel="noopener noreferrer">
          The 2019 TurtleCoin Hackathon
        </a>
      </p>
      <p className="footer__licence">
        Code licensed under{' '}
        <a
          href="https://github.com/ChainSubSpace/chainsub-reactjs-frontend/blob/master/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT
        </a>
        , content under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/legalcode"
          target="_blank"
          rel="noopener noreferrer"
        >
          CCA4
        </a>
        .
      </p>
      <div className="footer__follow">
        <iframe
          title="github"
          src={`https://ghbtns.com/github-btn.html?user=${projectGithub.user}&repo=${projectGithub.repo}&type=star&count=true&size=small`}
          frameBorder={0}
          scrolling={0}
          width="100px"
          height="20px"
        />
        <div className="footer__twitter" ref={twitterButton} />
      </div>
    </footer>
  )
}
