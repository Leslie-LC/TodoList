// import { Todo } from "@/types/todo";

// // 保存数据到浏览器的缓存中
// export function saveTodos(todos: Todo[]) {
//     localStorage.setItem('todos_key', JSON.stringify(todos))
// }

// // 读取数据，从浏览器的缓存中
// export function readTodos(): Todo[] {
//     return JSON.parse(localStorage.getItem('todos_key') || '[]')
// }

export function saveTodos(key: string, value: []) {
    localStorage.setItem(key, JSON.stringify(value))
}
export function readTodos(key: string) {
    return JSON.parse(localStorage.getItem(key) || '[]')
}