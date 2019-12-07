import gql from 'graphql-tag'

export const GET_CURRENT_USER = gql`
  {
    user @client {
      jwt
      isLoggedIn
      info {
        id
        username
        email
        confirmed
        blocked
      }
    }
  }
`

export const LOGIN = gql`
  mutation($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      isLoggedIn @client
      info: user {
        id
        username
        email
        confirmed
        blocked
      }
    }
  }
`

export const REGISTER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(input: { username: $username, email: $email, password: $password }) {
      jwt
      isLoggedIn @client
      info: user {
        id
        username
        email
        confirmed
        blocked
      }
    }
  }
`

const POST_DETAILS_FRAGMENT = gql`
  fragment PostDitails on BlogPost {
    id
    title
    slug
    wordCount
    readingTime
    views
    createdAt
    updatedAt
    heroImage
    author {
      id
      username
      slug
      about
    }
    category {
      id
      name
      slug
    }
    tags {
      id
      name
      slug
    }
  }
`

export const CREATE_POST = gql`
  mutation($title: String!, $category: ID!, $content: String!) {
    response: createPost(
      input: { data: { title: $title, category: $category, content: $content, draft: true } }
    ) {
      post {
        content
        ...PostDitails
      }
    }
  }
  ${POST_DETAILS_FRAGMENT}
`
export const UPDATE_POST = gql`
  mutation($id: ID!, $title: String!, $category: ID!, $content: String!, $heroImage: String) {
    response: updatePost(
      input: {
        where: { id: $id }
        data: {
          heroImage: $heroImage
          title: $title
          category: $category
          content: $content
          draft: true
        }
      }
    ) {
      post {
        content
        ...PostDitails
      }
    }
  }
  ${POST_DETAILS_FRAGMENT}
`

export const GET_POST = gql`
  query($id: ID!) {
    post(id: $id) {
      content
      ...PostDitails
    }
  }
  ${POST_DETAILS_FRAGMENT}
`

export const GET_TRANSACTIONS = gql`
  query($type: TransactionType!, $owner: Owner!, $ownerId: String, $start: Int!, $limit: Int!) {
    transactions(type: $type, owner: $owner, ownerId: $ownerId, start: $start, limit: $limit) {
      total
      transactions {
        blockHeight
        hash
        paymentID
        fee
        amount
        createdAt
        id
      }
    }
  }
`

export const GET_POST_BY_SLUG = gql`
  query($slug: String!) {
    postData: postDataBySlug(slug: $slug) {
      wallet {
        id
        address
        unlockedBalance
        lockedBalance
        totalReceived
        totalSent
      }
      post {
        content
        ...PostDitails
      }
    }
  }
  ${POST_DETAILS_FRAGMENT}
`

export const GET_POSTS = gql`
  query($start: Int, $limit: Int, $where: JSON) {
    items: postsConnection(where: $where) {
      total: aggregate {
        count
      }
    }
    posts(sort: "createdAt:desc", start: $start, limit: $limit, where: $where) {
      virtualTurtleTotalReceived
      ...PostDitails
    }
  }
  ${POST_DETAILS_FRAGMENT}
`
export const GET_CATEGORIES = gql`
  query {
    cats: categories {
      id
      name
      slug
    }
  }
`

export const GET_CATEGORY_BY_SLUG = gql`
  query($where: JSON) {
    categories(where: $where) {
      id
      name
      slug
    }
  }
`
export const GET_TAG_BY_SLUG = gql`
  query($where: JSON) {
    tags(where: $where) {
      id
      name
      slug
    }
  }
`

export const GET_AUTHOR_BY_SLUG = gql`
  query($where: JSON) {
    authors(where: $where) {
      id
      username
      slug
      about
    }
  }
`

// SECURE PRIVATE QUERIES

export const GET_USER_POSTS = gql`
  query {
    userPosts {
      ...PostDitails
    }
  }
  ${POST_DETAILS_FRAGMENT}
`

const WALLET_FRAGMENT = gql`
  fragment WalletDitails on Wallet {
    id
    type
    address
    unlockedBalance
    lockedBalance
    locked
    totalReceived
    totalSent
  }
`

export const GET_WALLETS = gql`
  query {
    wallets {
      mainWalletTurtle {
        ...WalletDitails
      }
      articlesWalletsTurtle {
        articleTitle
        articleSlug
        ...WalletDitails
      }
    }
  }
  ${WALLET_FRAGMENT}
`

export const WITHDRAW = gql`
  mutation($amount: Int!, $to: String!, $from: String) {
    withdraw(amount: $amount, to: $to, from: $from) {
      status
      wallet {
        ...WalletDitails
      }
    }
  }
  ${WALLET_FRAGMENT}
`
export const UPLOAD = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      name
      hash
      sha256
      ext
      mime
      size
      url
      id
    }
  }
`

export const GET_BALANCE = gql`
  query {
    balance {
      turtle {
        ...WalletDitails
      }
    }
  }
  ${WALLET_FRAGMENT}
`
