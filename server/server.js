const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const User = require("./models/User");

// DB connection
const connect = require("./connect");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (ctx) => ctx,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);

    // connect to the db
    connect().then(async () => {
        // let userModel = new User();
        // userModel.username = "jane";
        // userModel.email = "jane@email.com";
        // const user = await userModel.save();
        // console.log(user);
    });
});
