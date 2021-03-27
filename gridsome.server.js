const fs = require('fs')
const { kebabCase } = require('lodash')

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const postFiles = fs.readdirSync('./src/data/posts')

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    const postsCollection = addCollection({typeName: 'posts'})
    postFiles.forEach(postFile => {
      try {
        const fileData = require(`./src/data/posts/${postFile}`)

        postsCollection.addNode({
          slug: kebabCase(fileData.title),
          ...fileData
        })
      } catch (error) {
        console.log(`unable to read file: ${postFile}`, error) 
      }
    })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
