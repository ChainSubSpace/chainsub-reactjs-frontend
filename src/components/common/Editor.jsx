import Editor, { theme } from 'rich-markdown-editor'
import React from 'react'

import { useMutation } from '@apollo/react-hooks'
import { UPLOAD } from '../../lib/backend-queries'

const hiddenToolbarButtons = {
  blocks: ['block-quote'],
  marks: ['deleted', 'block-quote']
}

theme.blockToolbarBackground = '#073B4C'
theme.blockToolbarItem = 'white'
theme.blockToolbarTrigger = '#ff5646'
theme.blockToolbarTriggerIcon = 'white'
theme.placeholder = '#757575'
export default ({ article, validateArticle }) => {
  const [upload] = useMutation(UPLOAD)

  const handleChange = value => validateArticle({ content: value() })

  return (
    <Editor
      readOnly={false}
      defaultValue={article.content}
      // headingsOffset={1}
      className="article__editor"
      onChange={handleChange}
      theme={{ hiddenToolbarButtons, ...theme }}
      uploadImage={async file => {
        console.log(file)
        const data = await upload({ variables: { file } })
        console.log(data)
        // const result = await s3.upload(file)
        console.log(data.data.upload.url)
        return `https://backend.chainsub.space${data.data.upload.url}`
      }}
    />
  )
}
