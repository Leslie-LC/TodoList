<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <!-- :deleteTodo="deleteTodo"中的等于号写成了冒号 -->
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo" />
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :clearAllcompletedtodos="clearAllcompletedtodos"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
// 引入子级组件
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
import { Todo } from "./types/todo";
import { saveTodos, readTodos } from "./utils/localStorageUtils";

export default defineComponent({
  name: "App",
  components: {
    Header,
    List,
    Footer,
  },
  setup() {
    // const state = reactive<{ todos: Todo[] }>({
    //   todos: [
    //     { id: 1, title: "奔驰", isCompleted: false },
    //     { id: 2, title: "宝马", isCompleted: false },
    //     { id: 3, title: "奥拓", isCompleted: false },
    //     { id: 4, title: "玛莎拉蒂", isCompleted: true },
    //   ],
    // });

    // const state = reactive<{ todos: Todo[] }>({
    //   todos: [],
    // });

    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    });

    const key = "todos_key";

    // 界面加载完毕后过了一会儿再读数据
    onMounted(() => {
      setTimeout(() => {
        state.todos = readTodos(key);
      }, 1000);
    });

    // 添加数据的方法
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };

    // 删除数据的方法
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1);
    };

    // 修改todo的isCompleted属性的状态
    const updateTodo = (todo: Todo, isComplete: boolean) => {
      todo.isCompleted = isComplete;
    };

    // 全选或者全不选的方法
    const checkAll = (isCompleted: boolean) => {
      state.todos.forEach((todo) => {
        todo.isCompleted = isCompleted;
      });
    };

    // 清理所有选中的数据
    const clearAllcompletedtodos = () => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    };

    // 监视操作：如果todo数组的数据变化，直接存储到浏览器的缓存中
    // watch(
    //   () => state.todos,
    //   (value) => {
    //     // 保存到浏览器的缓存里面
    //     localStorage.setItem("todos_key", JSON.stringify(value));
    //   },
    //   { deep: true }
    // );

    // watch(
    //   () => state.todos,
    //   (value) => {
    //     // 保存到浏览器的缓存里面
    //     saveTodos(value);
    //   },
    //   { deep: true }
    // );

    // watch(() => state.todos, saveTodos, { deep: true });

    watch(
      () => state.todos,
      (value: Todo[]) => {
        saveTodos(key, value as []);
      },
      { deep: true }
    );

    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateTodo,
      checkAll,
      clearAllcompletedtodos,
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
