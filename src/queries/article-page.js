import * as contentstack from "contentstack";

const Stack = contentstack.Stack({
  api_key: process.env.VUE_APP_STACK_API_KEY,
  delivery_token: process.env.VUE_APP_ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN,
  environment: process.env.VUE_APP_ENVIRONMENT_NAME,
});

export const getEntry = uid => {
  const Query = Stack.ContentType("movie_article").Entry(uid);

  return Query.fetch()
    .then(entry => {
      return entry.toJSON(); // You can also use toJSON() to convert the entry result object to JSON.
    })
    .catch(error => {
      console.error("Error:", error);
    });
};
