import React, { useState, useRef } from 'react'
import cn from 'classnames'

import { get } from 'lodash-es'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { GET_CATEGORY_BY_SLUG, UPLOAD } from '../../lib/backend-queries'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Title is required'),
  category: Yup.string().required('Category is required!')
})

export default ({ article, validateArticle, isNewPost }) => {
  const categories = useQuery(GET_CATEGORY_BY_SLUG)

  const [upload] = useMutation(UPLOAD)

  const heroUploadButton = useRef()

  const [heroImage, setHeroImage] = useState(article.heroImage ? article.heroImage : null)

  return (
    <div>
      <Formik
        initialValues={{ title: article.title, category: article.category, heroImage: '' }}
        validationSchema={validationSchema}
        validateOnChange={true}
        validate={async values => {
          validateArticle({...values, heroImage})
        }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setSubmitting(false)
        }}
      >
        {({
          isSubmitting,
          errors,
          status,
          touched,
          setFieldValue
        }) => (
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
z                />
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
            {!isNewPost && (
              <button
                className="btn small"
                type="button"
                onClick={() => heroUploadButton.current.click()}
                disabled={isSubmitting}
              >
                <div className="button__content">Add header image</div>
              </button>
            )}

            <input
              style={{ display: 'none' }}
              ref={heroUploadButton}
              id="file"
              name="heroImage"
              type="file"
              onChange={async event => {
                const file = event.currentTarget.files[0]
                const data = await upload({ variables: { file } })
                const filePath = data.data.upload.url
                setHeroImage(filePath)
                setFieldValue('heroImage', filePath)
              }}
            />

            {heroImage && (
              <div style={{ margin: '10px 0' }}>
                <img alt="Hero" src={`https://backend.chainsub.space${heroImage}`} />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}
