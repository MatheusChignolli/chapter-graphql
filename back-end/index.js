// https://graphql.org/graphql-js/running-an-express-graphql-server/
const express = require('express')
var cors = require('cors')
const graphql = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const query = require('./src/query')
const mutation = require('./src/mutation')

const app = express()
const PORT = 8000

var schema = graphql.buildSchema(`
  scalar Void

  type Tag {
    id: Int!
    name: String!
    color: String
  }

  type Item {
    id: Int!
    value: String!
    tag: Tag
  }

  type Query {
    getTags: [Tag]
    getItems: [Item]
  }

  type Mutation {
    createTag(name: String!, color: String): Tag
    updateTag(id: Int!, name: String, color: String): Tag
    deleteTag(id: Int!): Void
    createItem(value: String!, tag: Int): Item
    updateItem(id: Int!, value: String, tag: Int): Item
    deleteItem(id: Int!): Void
  }
`);

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: {
    ...query,
    ...mutation
  },
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`
    Server running on http://localhost:${PORT}
    GraphQl Playground on http://localhost:${PORT}/graphql
  `)
})
