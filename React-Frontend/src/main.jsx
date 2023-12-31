import ReactDOM from "react-dom/client";
import config from "../constants/constants.js";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App.jsx";
import "./index.css";

const client = new ApolloClient({
  // connect to GraphQL backend
  uri: config.GQL_BACKEND_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
