const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      id: { type: GraphQLInt },
      first_name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    })
  });

  module.exports = UserType;