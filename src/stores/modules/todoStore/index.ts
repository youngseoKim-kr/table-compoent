import { action, makeObservable, observable } from 'mobx'
import { Headers, HeaderType, ToDo } from '@models/Todo'

export class ToDoStore {
  todos: ToDo[] | null = null
  originalTodos: ToDo[] | null = null
  headers: Headers[] = []

  constructor() {
    makeObservable(this, {
      todos: observable,
      headers: observable,

      addTodo: action,
      setTodo: action,
      editTodo: action,
      sortTodo: action,
    })
  }

  setTodo(todoData: ToDo[]) {
    this.headers = Object.keys(todoData[0]).map((key) => {
      return {
        label: HeaderType[key]?.label,
        key,
        isSortable: key === 'id' || key === 'date',
        isAsc: null,
        type: HeaderType[key].type,
      }
    })
    this.todos = todoData
    this.originalTodos = [...todoData]
  }

  addTodo(todoData: ToDo) {
    if (!this.todos) return
    if (!todoData.id) {
      todoData.id = this.todos.length + 1
    }
    this.todos?.push(todoData)
    this.originalTodos?.push(todoData)
  }

  editTodo(todoData: ToDo) {
    if (!this.todos || !this.originalTodos) return
    const index = this.todos.findIndex((todo) => todo.id === todoData.id)
    const originalIndex = this.originalTodos.findIndex((todo) => todo.id === todoData.id)

    if (index !== -1 && originalIndex !== -1) {
      this.todos[index] = todoData // todos 수정
      this.originalTodos[originalIndex] = todoData // originalTodos 수정
    }
  }

  sortTodo(key: string) {
    if (!this.todos) return

    const header = this.headers.find((h) => h.key === key)
    if (!header) return

    if (header.isAsc === null) {
      // 오름차순 정렬
      this.todos = this.todos.slice().sort((a, b) => {
        if (a[key] === null || b[key] === null) return 0
        return a[key] > b[key] ? 1 : -1
      })
      header.isAsc = true
    } else if (header.isAsc) {
      // 내림차순 정렬
      this.todos = this.todos.slice().sort((a, b) => {
        if (a[key] === null || b[key] === null) return 0
        return a[key] < b[key] ? 1 : -1
      })
      header.isAsc = false
    } else if (!header.isAsc) {
      // 정렬 해제 (초기 상태로 복원)
      this.todos = [...(this.originalTodos || [])]
      header.isAsc = null
    }
  }
}
