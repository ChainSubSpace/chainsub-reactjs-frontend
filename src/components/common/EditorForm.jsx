import React from 'react'
import cn from 'classnames'

import { get } from 'lodash-es'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { useQuery } from '@apollo/react-hooks'
import { GET_CATEGORY_BY_SLUG } from '../../lib/backend-queries'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Title is required'),
  category: Yup.string().required('Category is required!')
})

export default ({ article, validateArticle }) => {
  const categories = useQuery(GET_CATEGORY_BY_SLUG)

  return (
    <div>
      <Formik
        initialValues={{ title: article.title, category: article.category }}
        validationSchema={validationSchema}
        validateOnChange={true}
        validate={async values => {
          validateArticle(values)
        }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            // await login({ variables: values })
          } catch (error) {
            // setStatus('Identifier or password invalid.')
          }
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, errors, status, touched, values, handleChange, handleBlur }) => (
          <Form className="form article_form">
            <div className={cn('status', { error: status })}>{status}</div>
            <ul>
              <li>
                <ErrorMessage className="error" name="title" component="div" />
                <Field
                  className={cn('field-style field-full align-none', {
                    error: errors.title && touched.title
                  })}
                  type="text"
                  name="title"
                  placeholder="Article title"
                  autoComplete="off"
                  // value={article.title}
                />
              </li>
              <li>
                <ErrorMessage className="error" name="category" component="div" />
                <Field
                  className={cn('field-style field-full align-none', {
                    error: errors.category && touched.category
                  })}
                  as="select"
                  name="category"
                  placeholder="Select a category"
                  autoComplete="off"
                  // value={article.category}
                >
                  <option value="">Select a category</option>
                  {get(categories, 'data.categories', []).map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </li>
            </ul>
          </Form>
        )}
      </Formik>
    </div>
  )
}
