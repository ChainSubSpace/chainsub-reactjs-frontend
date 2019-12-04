import Editor, { theme } from 'rich-markdown-editor'
import React from 'react'

const hiddenToolbarButtons = {
  blocks: ['block-quote'],
  marks: ['deleted', 'block-quote']
}

theme.blockToolbarBackground = '#073B4C'
theme.blockToolbarItem = '#ff5646'
theme.blockToolbarTrigger = '#ff5646'
theme.blockToolbarTriggerIcon = 'white'
theme.placeholder = '#757575'
export default ({ article, validateArticle }) => {

  const handleChange = value => validateArticle({content: value()})

  return (
    <Editor
      readOnly={false}
      defaultValue={article.content}
      headingsOffset={1}
      className="article__editor"
      onChange={handleChange}
      theme={{ hiddenToolbarButtons, ...theme }}
      uploadImage={async file => {
        const result = await s3.upload(file)
        return result.url
      }}
    />
  )
}
