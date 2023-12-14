import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { PORT, FRONTEND_URL } from "./constants/constants.js";
import { typeDefs } from "./schema/schema.js";

let todo1 = [];

const app = express();
app.use(cors({ origin: FRONTEND_URL }));

const resolvers = {
  Query: {
    todos() {
      return todo1;
    },
  },
  Mutation: {
    addTodo(_, args) {
      let data = {
        ...args.item,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      todo1.push(data);
      return data;
    },

    updateTodo(_, args) {
      todo1 = todo1.map((n) => {
        if (n.id === args.id) {
          return { ...n, ...args.edits };
        }
        return n;
      });
      return todo1.find((n) => n.id === args.id);
    },

    deleteTodo(_, args) {
      todo1 = todo1.filter((i) => i.id !== args.id);
      return todo1;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: { origin: FRONTEND_URL },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
