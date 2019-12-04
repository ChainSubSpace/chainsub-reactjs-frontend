import React from 'react'

import Helmet from 'react-helmet'

import Header from './layout/Header'
import Footer from './layout/Footer'

import '../styles/main.scss'

import helmetConfig from '../helmetConfig'

export default ({ children }) => (
  <div className="main full">
    <div className="full">
      <Helmet {...helmetConfig.head} />
      <Header />
      <div className="page openable">{children}</div>
      <Footer />
    </div>
  </div>
)
