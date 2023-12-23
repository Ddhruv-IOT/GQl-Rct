import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query Query {
    todos {
      item
      id
    }
  }
`;

export const ADD_TODO = gql`
  mutation Mutation($item: AddInputItem!) {
    addTodo(item: $item) {
      item
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodoMutation($updateTodoId: ID!, $edits: EditTodoItem!) {
    updateTodo(id: $updateTodoId, edits: $edits) {
      item
    }
  }
`;

export const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodoMutation($deleteTodoId: ID!) {
    deleteTodo(id: $deleteTodoId) {
      id
      item
    }
  }
`;
