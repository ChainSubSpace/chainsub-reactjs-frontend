import React from 'react'

import Markdown from './Markdown'

export default ({ post }) => (
  <div className="blog__article">
    <Markdown markdown={post.content} />
  </div>
)
