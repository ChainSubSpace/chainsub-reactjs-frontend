import React from 'react'
import ReactMarkdown from 'react-markdown'
import GithubSlugger from 'github-slugger'
// import "prismjs/components/prism-graphql.min"
// import { createBrowserHistory } from 'history'

import Prism from './Prism'

// const history = createBrowserHistory()

function CustomImg(props) {
  return (
    <span style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}>
      <img alt="uploaded" src={props.src} />
    </span>
  )
}

const CustomCode = ({ language, value: code }) => {
  if (!language) return null
  if ( !['javascript', 'graphql'].includes(language)) return null

  const html = Prism.highlight(code, Prism.languages[language], language)

  return (
    <div className="codeBlock">
      <code className="language-js" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

function CustomHeading(props) {
  if (props.children.length === 0) return <h1>title</h1>
  const { value } = props.children[0].props
  const CustomTag = `h${props.level}`
  const slugger = new GithubSlugger()

  const slug = slugger.slug(value)

  const hashPath = `${window.location.pathname}#${slug}`

  if (props.level >= 2) {
    return (
      <CustomTag id={slug}>
        <a
          onClick={e => {
            e.preventDefault()
            // history.push(hashPath)
            window.history.pushState('', '', hashPath)
            const element = document.getElementById(slug)
            if (element) element.scrollIntoView()
          }}
          href="/"
          className="anchor"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fillRule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            />
          </svg>
        </a>
        {value}
      </CustomTag>
    )
  }

  return <CustomTag>{props.children}</CustomTag>
}

export default ({ markdown }) => (
  <ReactMarkdown
    source={markdown}
    escapeHtml={true}
    renderers={{ heading: CustomHeading, image: CustomImg, code: CustomCode }}
  />
)
