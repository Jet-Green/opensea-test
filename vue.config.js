const gqlMiddleware = require('./server/graphql');

module.exports = {
  devServer: {
    before(app) {
      app.use('/graphql', gqlMiddleware);
    }
  }
};
