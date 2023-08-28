import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import data from "./data.js";

const resolvers = {
  Query: {
    games() {
      return data.games;
    },
    game(_, args) {
      return data.games.find((game) => game.id === args.id);
    },
    reviews() {
      return data.reviews;
    },
    review(_, args) {
      return data.reviews.find((review) => review.id === args.id);
    },
    authors() {
      return data.authors;
    },
    author(_, args) {
      return data.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return data.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return data.authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return data.games.find((g) => g.id === parent.game_id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
