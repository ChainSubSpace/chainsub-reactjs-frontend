import { Link } from 'gatsby'
import React from 'react'

import {formatDate, prettyPrintAmount} from '../../lib/helpers'

export default ({ post, totalReceived }) => (
  <div className="post_info">
    <div className="post_info__meta">
      <div>
        <strong>Author:</strong>{' '}
        <Link to={`/blog/author/${post.author.slug}`}>{post.author.username}</Link>
      </div>
      <div>
        <strong>Published:</strong> {formatDate(post.createdAt)}
      </div>
      <div>
        <strong>Time to read:</strong> {post.readingTime}
      </div>
      <div>
        <strong>Words:</strong> {post.wordCount}
      </div>
      <div>
        <strong>Received:</strong> {prettyPrintAmount(totalReceived)}
      </div>
      <div>
        <strong>Views:</strong> {post.views}
      </div>
      <div>
        <strong>Category:</strong>{' '}
        <Link state={{ categoryID: post.category.id }} to={`/blog/category/${post.category.slug}`}>
          {post.category.name}
        </Link>
      </div>
      <div className="post_info__tags">
        <strong>Tags:</strong>{' '}
        {post.tags.map(tag => (
          <Link to={`/blog/tag/${tag.slug}`} key={tag.name}>
            #{tag.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
)
