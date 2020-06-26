import React from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";
import App from "./pages/App";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import Success from "./pages/success";

const httpLink = createHttpLink({
  uri: "https://stitch.mongodb.com/api/client/v2.0/app/mothmaps-kicwt/graphql",
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const routing = (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/success" component={Success} />
      </div>
    </Router>
  </ApolloProvider>
);
ReactDOM.render(routing, document.getElementById("root"));
