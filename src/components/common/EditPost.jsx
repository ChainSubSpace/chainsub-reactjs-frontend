import React, { useReducer } from 'react'
import Helmet from 'react-helmet'

import cn from 'classnames'
import { get, isEqual } from 'lodash-es'

import { useMutation, useQuery } from '@apollo/react-hooks'
import {UPDATE_POST, GET_POST } from '../../lib/backend-queries'

import { useInterval } from '../../lib/helpers'

import EditorForm from './EditorForm'
import Editor from './Editor'
import Markdown from '../Post/Markdown'

const editorInitialState = {
  article: {
    id: null,
    title: null,
    content: null,
    category: null,
    heroImage: null
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
            content: post.content,
            heroImage: post.heroImage
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
      <Helmet title="Article editor" />
      <section className="container">
        <Markdown markdown={`# ${editorState.article.title}`} />
        <div className="page_item">
          <EditorForm article={editorState.article} validateArticle={validateArticle} />
        </div>
        <div className="page_item editor chainsub_editor">

            <div className={cn('title', { error: editorState.statusMessage })}>
              {editorState.statusMessage}
            </div>

          <div className="content">
            <Editor article={editorState.article} validateArticle={validateArticle} />
          </div>
        </div>
      </section>
    </div>
  )
}

