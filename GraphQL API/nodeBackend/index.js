import cors from "cors";
import express from "express";
import {ApolloServer,gql} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'


const app = express();
app.use(cors());

let todo1 = [
  { item: "it1", id: "1" },
  { item: "it2", id: "2" },
  { item: "it3", id: "3" },
];

const typeDefs = `#graphql
  
  # Basic strcutre for the list
  type Todo {
    id: ID!
    item: String!
  }

  # Fetch the whole list
  type Query {
    todos: [Todo]
  }

  # Make chnages to the List
  type Mutation {
    addTodo(item: AddInputItem): Todo
    updateTodo(id: ID!, edits: EditTodoItem!): Todo
    deleteTodo(id: ID!): [Todo]
  }

  input AddInputItem {
    item: String!,
  }

  input EditTodoItem {
    item: String!,
  }

`;

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
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});