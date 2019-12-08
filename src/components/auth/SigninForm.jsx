import React from 'react'
import cn from 'classnames'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { navigate } from 'gatsby'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { GET_CURRENT_USER, LOGIN } from '../../lib/backend-queries'

const validationSchema = Yup.object().shape({
  identifier: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required')
})

export default () => {
  const [login] = useMutation(LOGIN, { fetchPolicy: 'no-cache' })
  const { data } = useQuery(GET_CURRENT_USER)

  if (data && data.user) navigate('/')

  return (
    <div>
      <Formik
        initialValues={{ identifier: '', password: '' }}
        validationSchema={validationSchema}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            await login({ variables: values })
          } catch (error) {
            setStatus('Identifier or password invalid.')
          }
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, errors, status, touched }) => (
          <Form className="form">
            <div className={cn('status', { error: status })}>{status}</div>
            <ul>
              <li>
                <ErrorMessage className="error" name="identifier" component="div" />
                <Field
                  className={cn('field-style field-full align-none', {
                    error: errors.identifier && touched.identifier
                  })}
                  type="text"
                  name="identifier"
                  placeholder="Username or email"
                  autoComplete="username"
                />
              </li>
              <li>
                <ErrorMessage className="error" name="password" component="div" />
                <Field
                  className={cn('field-style field-full align-none', {
                    error: errors.password && touched.password
                  })}
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                />
              </li>
            </ul>
            <button className="btn small" type="submit" disabled={isSubmitting}>
              <div className="button__content">Login</div>
            </button>
            <button
              className="btn small"
              type="button"
              onClick={() => navigate('/auth/signup')}
              disabled={isSubmitting}
            >
              <div className="button__content">Register</div>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
