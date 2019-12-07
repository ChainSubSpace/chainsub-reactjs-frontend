import { Link, navigate } from 'gatsby'
import React, { useMemo } from 'react'

import PostInfo from '../Post/PostInfo'

const AuthoringTools = ({ postId }) => (
  <div className="post__tools">
    <button
      onClick={() => navigate(`/user/article/edit/${postId}`)}
      className="btn small"
      type="button"
    >
      <div className="button__content">Edit</div>
    </button>
    <button
      onClick={() => navigate(`/user/article/archive/${postId}`)}
      className="btn small"
      type="button"
    >
      <div className="button__content">Archive</div>
    </button>
  </div>
)

export default ({ user, post }) =>
  useMemo(
    () => (
      <div className="page_item article_list_item" key={post.id}>
        {post.heroImage && (<img alt="Title" src={`https://backend.chainsub.space${post.heroImage}`} />)}
        <div className="content">
          <div className="blog__post_title">
            <Link rel="prefetch" to={`/blog/${post.slug}`}>
              {post.title.replace(/<[^>]+>/g, '')}
            </Link>
          </div>
          <PostInfo post={post} totalReceived={post.virtualTurtleTotalReceived} />
          {user && user.username === post.author.username && <AuthoringTools postId={post.id} />}
        </div>
      </div>
    ),
    [post, user]
  )
