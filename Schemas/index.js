
const userData = require("../MOCK_DATA.json")
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const UserType = require('./TypeDefs/UserType');

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
          first_name: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
        },
        resolve(parent, args) {
          // db.insertOne()
          userData.push({id: userData.lenght + 1, first_name: args.first_name, email: args.email, password: args.password})
          return args
        }
      }
    }
  });
  
  module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  })