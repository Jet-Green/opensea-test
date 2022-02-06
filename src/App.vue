<template>
  <div>
    <ApolloMutation
      tag="h1"
      :mutation="$options.queries.resetTodosQuery"
      v-slot="{ mutate }"
      @done="notify('reset')"
    >
      <button @click="mutate()">Reset</button>
    </ApolloMutation>
    <ApolloQuery tag="ul" :query="$options.queries.todosQuery" v-slot="{ result: { data } }">
      <template v-if="data">
        <li v-for="todo in data.todos" :key="todo.id" :class="{completed: todo.completedAt}">
          <p>{{ todo.text }}</p>
          <ApolloMutation
            :mutation="$options.queries.completeTodoQuery"
            :variables="{ id: todo.id }"
            v-slot="{ mutate }"
            @done="notify('complete', todo.id)"
          >
            <button v-if="!todo.completedAt" @click="mutate()">Mark as complete</button>
          </ApolloMutation>
        </li>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import todosQuery from "./graphql/todos.gql";
import completeTodoQuery from "./graphql/completeTodo.gql";
import resetTodosQuery from "./graphql/resetTodos.gql";
import { ApolloMutation, ApolloQuery } from "vue-apollo";

export default {
  components: {
    ApolloQuery,
    ApolloMutation
  },
  queries: {
    todosQuery,
    completeTodoQuery,
    resetTodosQuery
  },
  methods: {
    notify(...args) {
      window.console.log("notify:", ...args);
    }
  }
};
</script>

<style>
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

li {
  display: block;
  margin: 5px;
  flex-shrink: 0;
  width: 200px;
  position: relative;
  border: solid black 1px;
  padding: 0 30px 30px 30px;
}

li button {
  position: absolute;
  bottom: 0;
  right: 0;
}

li.completed {
  background-color: #f0ffff;
}
</style>
