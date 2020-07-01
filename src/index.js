// React
import React from "react";
import { render } from "react-dom";
// Apollo
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "@apollo/react-hooks";
// Realm
import * as RealmWeb from "realm-web";
// Check out app.js for examples of how to run GraphQL operations
import App from "./pages/App";
import "./assets/main.css"
//
// Once your app is set up, replace the value of APP_ID with your App ID
export const APP_ID = "mothmaps2020-tfpod";

const app = new RealmWeb.App({
  id: APP_ID,
  baseUrl: "https://realm.mongodb.com"
});

// Add an Authorization header with a valid user access token to all GraphQL requests
const authorizationHeaderLink = setContext(async (_, { headers }) => {
  if (app.currentUser) {
    // Refreshing custom data also refreshes the access token
    await app.currentUser.refreshCustomData();
  } else {
    // If no user is logged in, log in an anonymous user
    await app.logIn(RealmWeb.Credentials.anonymous());
  }
  // Get a valid access token for the current user
  const { accessToken } = app.currentUser;
  console.log("currentUser", accessToken);

  // Set the Authorization header, preserving any other headers
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    }
  };
});

// Construct a new Apollo HttpLink that connects to your app's GraphQL endpoint
const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
const httpLink = new HttpLink({ uri: graphql_url });

// Construct a new Apollo client with the links we just defined
const client = new ApolloClient({
  link: authorizationHeaderLink.concat(httpLink),
  cache: new InMemoryCache()
});

render(
  // Wrap your app with an ApolloProvider
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
