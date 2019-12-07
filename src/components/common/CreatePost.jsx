import React, { useReducer } from 'react'
import Helmet from 'react-helmet'

import cn from 'classnames'
import { get, isEqual } from 'lodash-es'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_POST } from '../../lib/backend-queries'

import { useInterval } from '../../lib/helpers'

import EditorForm from './EditorForm'
import Editor from './Editor'
import Markdown from '../Post/Markdown'

const editorInitialState = {
  article: {
    title: '',
    content: '',
    category: ''
  },
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
        statusMessage: `Editing mode: [${state.article.content.length}] symbols`
      }
    default:
      throw new Error()
  }
}

export default ({ navigate }) => {
  const [createPost] = useMutation(CREATE_POST)
  const [editorState, execute] = useReducer(editorReducer, editorInitialState)

  useInterval(async () => {
    if (editorState.executeIntervalAfterRepeats === 1) {
      execute({ action: 'saving' })

      let post

      try {
        post = await createPost({ variables: editorState.article })
      } catch (error) {
        get(error, 'message', '').includes('E11000') &&
          execute({ action: 'setMessage', payload: 'Saving mode: [Failed] Title already exists' })

        return
      }

      const postId = get(post, 'data.response.post.id')

      postId && navigate(`/user/article/edit/${postId}`, { replace: true })
    } else {
      execute({ action: 'count' })
    }
  }, editorState.onChangeIntervalInMs)

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
          <EditorForm
            isNewPost={true}
            article={editorState.article}
            validateArticle={validateArticle}
          />
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
