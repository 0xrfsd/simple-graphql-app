const express = require("express");
const app = express();
const PORT = 3003;
const userData = require("./MOCK_DATA.json")
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const { graphqlHTTP } = require("express-graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        // db.insertOne()
        userData.push({id: userData.lenght + 1, firstName: args.firstName, lastName: args.lastName, email: args.email, password: args.password})
        return args
      }
    }
  }
});

const schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphql: true
}));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});
