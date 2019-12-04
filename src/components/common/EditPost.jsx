import React, { useReducer } from 'react'
import Helmet from 'react-helmet'

import cn from 'classnames'
import { get, isEqual } from 'lodash-es'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { UPDATE_POST, GET_POST } from '../../lib/backend-queries'

import { useInterval } from '../../lib/helpers'

import EditorForm from './EditorForm'
import Editor from './Editor'

const editorInitialState = {
  article: {
    id: null,
    title: null,
    content: null,
    category: null
  },
  dataIsReady: false,
  onChangeIntervalInMs: null,
  executeIntervalAfterRepeats: 5,
  statusMessage: null
}

function editorReducer(state, action) {
  switch (action.action) {
    case 'save':
      return { ...state, onChangeIntervalInMs: 1000, executeIntervalAfterRepeats: 5 }
    case 'saving':
      return {
        ...state,
        onChangeIntervalInMs: null,
        executeIntervalAfterRepeats: 5,
        statusMessage: `Saving...`
      }
    case 'count':
      return {
        ...state,
        executeIntervalAfterRepeats: state.executeIntervalAfterRepeats - 1,
        statusMessage: `Auto save in: [${state.executeIntervalAfterRepeats - 1}] seconds.`
      }
    case 'setMessage':
      return { ...state, statusMessage: action.payload }
    case 'setArticle':
      return {
        ...state,
        article: action.payload,
        dataIsReady: true,
        statusMessage: `Editing mode: [${action.payload.content.length}] symbols.`
      }
    default:
      throw new Error()
  }
}

export default ({ id }) => {
  const [updatePost] = useMutation(UPDATE_POST)
  const [editorState, execute] = useReducer(editorReducer, editorInitialState)

  useInterval(async () => {
    if (editorState.executeIntervalAfterRepeats === 1) {
      execute({ action: 'saving' })

      try {
        await updatePost({ variables: editorState.article })
        execute({ action: 'setMessage', payload: 'Saving mode: [Success] All changes are saved.' })
      } catch (error) {
        get(error, 'message', '').includes('E11000') &&
          execute({ action: 'setMessage', payload: 'Saving mode: [Failed] Title already exists.' })
      }
    } else {
      execute({ action: 'count' })
    }
  }, editorState.onChangeIntervalInMs)

  useQuery(GET_POST, {
    variables: { id },
    // fetchPolicy: 'network-only',
    fetchPolicy: 'cache-and-network',
    // fetchPolicy: 'cache-first',
    onCompleted: ({ post }) => {
      post &&
        execute({
          action: 'setArticle',
          payload: {
            id: post.id,
            title: post.title,
            category: post.category.id,
            content: post.content
          }
        })
    }
  })

  if (!editorState.dataIsReady) return null

  const validateArticle = state => {
    const newState = { ...editorState.article, ...state }
    if (isEqual(newState, editorState.article)) return

    execute({ action: 'setArticle', payload: newState })

    let message

    if (newState.content.length < 10) message = 'Saving mode: [Failed] Content is too short.'
    if (!newState.category)
      message = 'Saving mode: [Failed] Category is required to enable auto save.'
    if (newState.title.length < 10)
      message = 'Saving mode: [Failed] Title is required to enable auto save.'

    if (message) {
      execute({ action: 'setMessage', payload: message })
    } else {
      execute({ action: 'save' })
    }
  }

  return (
    <div className="blog">
      <Helmet title="Edit article" />
      <section className="container">
        <h1>
          <strong>Article:</strong> {editorState.article.title}
        </h1>
        <div className="blog__post_item">
          <EditorForm article={editorState.article} validateArticle={validateArticle} />
        </div>
        <div className={cn('status', { error: editorState.statusMessage })}>
          {editorState.statusMessage}
        </div>

        <div className="blog__post_item">
          <Editor article={editorState.article} validateArticle={validateArticle} />
        </div>
      </section>
    </div>
  )
}
