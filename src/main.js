import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import router from "@/router";

import App from "./App.vue";
import LazyLoad from "./directives/LazyLoad";

const GRAPHQL_ENDPOINT = `https://graphql.contentstack.com/stacks/${process.env.VUE_APP_STACK_API_KEY}?environment=${process.env.VUE_APP_ENVIRONMENT_NAME}`;

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    access_token: process.env.VUE_APP_ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN,
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(router);
app.directive("lazyload", LazyLoad)
app.mount("#app");
