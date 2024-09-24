import { action, makeObservable, observable } from 'mobx'
import { Headers, HeaderType, ToDo } from '@models/Todo'

export class ToDoStore {
  todos: ToDo[] | null = null
  headers: Headers[] = []

  constructor() {
    makeObservable(this, {
      todos: observable,
      headers: observable,

      addTodo: action,
      setTodo: action,
      editTodo: action,
    })
  }

  setTodo(todoData: ToDo[]) {
    this.headers = Object.keys(todoData[0]).map((key) => {
      return {
        label: HeaderType[key]?.label,
        key,
        isSortable: key === 'id' || key === 'date',
        isAsc: true,
        type: HeaderType[key].type,
      }
    })
    this.todos = todoData
  }

  addTodo(todoData: ToDo) {
    if (!this.todos) return
    if (!todoData.id) {
      todoData.id = this.todos.length + 1
    }
    this.todos.push(todoData)
  }

  editTodo(todoData: ToDo) {
    if (!this.todos) return
    const index = this.todos.findIndex((todo) => todo.id === todoData.id)
    if (index !== -1) {
      this.todos[index] = todoData
    }
  }
}
