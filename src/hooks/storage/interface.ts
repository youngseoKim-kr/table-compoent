interface ToDo {
  id: number
  title: string
  content: string
  date: string
  isCompleted: boolean
}

export type StorageType = {
  todo: ToDo[]
}