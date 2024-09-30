import { action, makeObservable, observable } from 'mobx'
import { Headers, HeaderType, ToDo } from '@models/Todo'

export class ToDoStore {
  todos: ToDo[] | null = null
  originalTodos: ToDo[] | null = null
  headers: Headers[] = []

  constructor() {
    makeObservable(this, {
      todos: observable,
      originalTodos: observable,
      headers: observable,

      addTodo: action,
      setTodo: action,
      editTodo: action,
      editToDoItem: action,
      sortToDoItem: action,
    })
  }

  setTodo(todoData: ToDo[]) {
    this.headers = Object.keys(todoData[0]).map((key) => {
      return {
        label: HeaderType[key]?.label,
        key,
        isSortable: key === 'id' || key === 'date' || key === 'content',
        isAsc: null,
        type: HeaderType[key].type,
      }
    })
    this.todos = todoData
    this.originalTodos = todoData
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
    if (!this.todos) return
    const index = this.todos.findIndex((todo) => todo.id === todoData.id)

    if (index !== -1) {
      this.headers.forEach((header) => {
        if (header.key !== 'id' && this.todos && this.originalTodos) {
          const resultTodo = [...this.todos]
          resultTodo[index][header.key] = todoData[header.key]
          this.todos = resultTodo
          this.originalTodos = this.todos
        }
      })
    }
  }

  editToDoItem(todoData: ToDo, key: string) {
    if (!this.todos) return
    const index = this.todos.findIndex((todo) => todo.id === todoData.id)

    if (index !== -1) {
      const resultTodo = [...this.todos]
      resultTodo[index][key] = !todoData[key]
      this.todos = resultTodo
      this.originalTodos = this.todos
    }
  }

  sortToDoItem(column: Headers) {
    if (!column.isSortable) return

    let newIsAsc: boolean | null

    if (column.isAsc === null && this.todos) {
      this.todos = this.todos.slice().sort((a, b) => {
        const aValue = a[column.key]
        const bValue = b[column.key]

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue)
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue
        } else {
          return 0
        }
      })
      newIsAsc = true
    } else if (column.isAsc && this.todos) {
      this.todos = this.todos.slice().sort((a, b) => {
        const aValue = a[column.key]
        const bValue = b[column.key]

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return bValue.localeCompare(aValue)
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return bValue - aValue
        } else {
          return 0
        }
      })
      newIsAsc = false
    } else {
      if (!this.originalTodos) return
      this.todos = [...this.originalTodos]
      newIsAsc = null
    }

    this.headers = this.headers.map((h) =>
      h.key === column.key
        ? { ...h, isAsc: newIsAsc }
        : {
            ...h,
            isAsc: null,
          },
    )
  }
}
