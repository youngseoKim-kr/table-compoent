import { action, makeObservable, observable } from 'mobx'

interface ToDo {
  id: number
  title: string
  content: string
  date: string
  isCompleted: boolean
}

export class ToDoStore {
  todo: ToDo[] | null = null

  constructor() {
    makeObservable(this, {
      todo: observable,

      setTodo: action,
    })
  }

  setTodo(todoData: ToDo[]) {
    this.todo = todoData
  }
}
