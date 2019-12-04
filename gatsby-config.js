const queries = require('./src/actions/algolia-queries')

const { algolia, siteMetadata, disqus, contentPaths } = require('./config')

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-twitter',
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    // {
    //   resolve: `gatsby-plugin-algolia-search`,
    //   options: {
    //     appId: algolia.appID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     queries,
    //     chunkSize: 10000,
    //     enablePartialUpdates: true
    //   }
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.name,
        short_name: siteMetadata.name,
        start_url: '/',
        background_color: '#073B4C',
        theme_color: '#073B4C',
        display: 'standalone',
        lang: 'en',
        icon: `static/logo.svg`
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: disqus.shortname
      }
    }
  ]
}
