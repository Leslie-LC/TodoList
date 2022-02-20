<template>
  <li
    @mouseenter="mousehandler(true)"
    @mouseleave="mousehandler(false)"
    :style="{ backgroundColor: bgColor, color: myColor }"
  >
    <label>
      <!-- 1.这里v-model前面必须加v-bind绑定，否则报错 2.isComplete改变勾选状态要去掉v-bind绑定-->
      <input type="checkbox" v-model="isComplete" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">
      删除
    </button>
  </li>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Todo } from "../types/todo";
export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    }, //函数返回的是Todo类型
    deleteTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const bgColor = ref("white");
    const myColor = ref("black");
    const isShow = ref(false);
    //   鼠标进入和离开事件的回调函数
    const mousehandler = (flag: boolean) => {
      if (flag) {
        //   鼠标进入
        bgColor.value = "pink";
        myColor.value = "green";
        isShow.value = true;
      } else {
        // 鼠标离开
        bgColor.value = "white";
        myColor.value = "black";
        isShow.value = false;
      }
    };
    // 删除数据的方法
    const delTodo = () => {
      // 提示
      if (window.confirm("确认要删除嘛？")) {
        props.deleteTodo?.(props.index);
      }
    };
    // 计算属性的方式--来让当前的复选框选中、不选中
    const isComplete = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(val) {
        props.updateTodo?.(props.todo, val);
      },
    });
    return {
      mousehandler,
      bgColor,
      myColor,
      isShow,
      delTodo,
      isComplete,
    };
  },
});
</script>
<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li button {
  float: right;
  margin-top: 3px;
}
li::before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
</style>
