const { createFilePath } = require(`gatsby-source-filesystem`)
const { kebabCase } = require('lodash')

const  createNodeId  = require('gatsby/dist/utils/create-node-id')

const {slugs: { tagPrefix, categoryPrefix, authorPrefix }} = require('../../config')

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if ([`AuthorYaml`].includes(node.internal.type)) {
    const AuthorSlug = node.id.split(' ').length > 1 ? kebabCase(node.id) : node.id

    const slug = node.slug || `${authorPrefix}/${AuthorSlug}/`
    createNodeField({ node, name: `slug`, value: slug })
  }

  if (node.internal.type !== 'MarkdownRemark') return

  const parentNode = getNode(node.parent)

  createNodeField({ node, name: `sourceType`, value: parentNode.sourceInstanceName })


  if (parentNode.sourceInstanceName === 'blog') {
    const title = node.frontmatter.title.replace(/<[^>]+>/g, '')

    createNodeField({ node, name: `title`, value: title})
    createNodeField({ node, name: `objectID`, value: createNodeId(title, 'blog')})

    const slug = node.frontmatter.slug || createFilePath({ node, getNode })
    createNodeField({ node, name: `slug`, value: slug })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(tag => `${tagPrefix}/${kebabCase(tag)}/`)
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }

    // noinspection JSUnresolvedVariable
    if (node.frontmatter.category) {
      const categorySlug = `${categoryPrefix}/${kebabCase(node.frontmatter.category)}/`
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
    }
  }
}
