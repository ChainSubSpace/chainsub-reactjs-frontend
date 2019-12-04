module.exports = ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/blog/)) {
    page.matchPath = '/blog/*'
    createPage(page)
  }

  if (page.path.match(/^\/user/)) {
    page.matchPath = '/user/*'
    createPage(page)
  }
}
