<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <!-- :deleteTodo="deleteTodo"中的等于号写成了冒号 -->
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo" />
      <Footer :todos="todos" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
// 引入子级组件
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
import { Todo } from "./types/todo";

export default defineComponent({
  name: "App",
  components: {
    Header,
    List,
    Footer,
  },
  setup() {
    const state = reactive<{ todos: Todo[] }>({
      todos: [
        { id: 1, title: "奔驰", isCompleted: false },
        { id: 2, title: "宝马", isCompleted: false },
        { id: 3, title: "奥拓", isCompleted: false },
        { id: 4, title: "玛莎拉蒂", isCompleted: true },
      ],
    });

    // 添加数据的方法
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1);
    };
    // 修改todo的isCompleted属性的状态
    const updateTodo = (todo: Todo, isComplete: boolean) => {
      todo.isCompleted = isComplete;
    };
    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateTodo,
    };
  },
});
</script>
<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
