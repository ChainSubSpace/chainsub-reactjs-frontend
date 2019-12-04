import React from 'react'
import cn from 'classnames'

import {navigate} from 'gatsby'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { get } from 'lodash-es'

import {useMutation, useQuery} from '@apollo/react-hooks'
import {GET_CURRENT_USER, REGISTER} from '../../lib/backend-queries'


const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required')
})

export default () => {
  const [register] = useMutation(REGISTER, { fetchPolicy: 'no-cache' })
  const { data } = useQuery(GET_CURRENT_USER)

  if (data && data.user) navigate('/')

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', passwordConfirm: '' }}
      validationSchema={validationSchema}
      validateOnChange={true}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        try {
          await register({ variables: values })
        } catch (error) {

          const backendError = get(
            error,
            'networkError.result.errors[0].extensions.data[0].messages[0].message',
            null
          )

          backendError && setStatus(backendError)
        }
        setSubmitting(false)
      }}
    >
      {({ isSubmitting, errors, status, touched }) => (
        <Form className="form">
          <div className={cn('status', { error: status })}>{status}</div>
          <ul>
            <li>
              <ErrorMessage className="error" name="username" component="div" />
              <Field
                className={cn('field-style field-full align-none', {
                  error: errors.username && touched.username
                })}
                type="text"
                name="username"
                placeholder="Username"
                autoComplete="username"
              />
            </li>
            <li>
              <ErrorMessage className="error" name="email" component="div" />
              <Field
                className={cn('field-style field-full align-none', {
                  error: errors.email && touched.email
                })}
                type="text"
                name="email"
                placeholder="Email"
                autoComplete="email"
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
                autoComplete="off"
              />
            </li>
            <li>
              <ErrorMessage className="error" name="passwordConfirm" component="div" />
              <Field
                className={cn('field-style field-full align-none', {
                  error: errors.passwordConfirm && touched.passwordConfirm
                })}
                type="password"
                name="passwordConfirm"
                placeholder="Confirm password"
                autoComplete="off"
              />
            </li>
          </ul>
          <button className="btn small" type="submit" disabled={isSubmitting}>
            <div className="button__content">Register</div>
          </button>
        </Form>
      )}
    </Formik>
  )
}
