import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'
import SignupForm from '../../components/auth/SignupForm'

export default ({ location }) => (
  <Layout location={location}>
    <div className="news">
      <Helmet title="Login" />
      <section className="container">
        <h1>
          Register <strong>form</strong>
        </h1>
        <div className="news__content">
          <SignupForm />
        </div>
      </section>
    </div>
  </Layout>
)
