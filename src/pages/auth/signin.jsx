import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'
import SigninForm from '../../components/auth/SigninForm'

export default ({ location }) => (
  <Layout location={location}>
    <div className="news">
      <Helmet title="Login" />
      <section className="container">
        <h1>
          Login <strong>form</strong>
        </h1>
        <div className="news__content">
          <SigninForm />
        </div>
      </section>
    </div>
  </Layout>
)
