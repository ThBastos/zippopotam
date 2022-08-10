import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';


export const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4000/",
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
})