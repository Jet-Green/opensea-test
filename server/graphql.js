const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const fakeTodos = [
  {
    id: 'todo-1',
    text: 'Record video about ApolloMutation',
    completed: false
  },
  {
    id: 'todo-2',
    text: 'Enslave the universe'
  },
  {
    id: 'todo-3',
    text: 'Pay debt'
  },
  {
    id: 'todo-4',
    text: 'Make Vue great again'
  },
  {
    id: 'todo-5',
    text: 'Make Vue great again'
  },
  {
    id: 'todo-6',
    text: 'Preorder OniVim2'
  }
];

const schema = buildSchema(`
  type Todo {
    id: ID!
    text: String!
    completedAt: String
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    completeTodo(id: ID!): Todo!
    resetTodos: [Todo!]!
  }
  
`);

const root = {
  todos: () => fakeTodos,
  completeTodo(args) {
    const todo = fakeTodos.find(({ id }) => id.toString() === args.id);
    todo.completedAt = Date.now();
    return todo;
  },
  resetTodos() {
    fakeTodos.forEach(todo => {
      todo.completedAt = null;
    });
    return fakeTodos;
  }
};

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
});
