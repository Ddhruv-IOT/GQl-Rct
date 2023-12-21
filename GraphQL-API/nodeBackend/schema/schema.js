export const typeDefs = `#graphql
  
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
