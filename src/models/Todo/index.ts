import { ReactNode } from 'react'

type WithNode<T> = T | ReactNode

export type ToDo = {
  id: WithNode<number | null>
  title: WithNode<string>
  content: WithNode<string>
  date: WithNode<string>
  completed: WithNode<boolean>
}

export type ToDoForm = {
  id: number | null
  title: string
  content: string
  date: string
  completed: boolean
}

export type Headers = {
  label: string
  key: string
  isSortable: boolean
  isAsc: boolean | null
  type: 'text' | 'check' | 'date'
}

export const HeaderType = {
  id: {
    label: '아이디',
    type: 'text',
  },
  title: {
    label: '제목',
    type: 'text',
  },
  content: {
    label: '내용',
    type: 'text',
  },
  date: {
    label: '날짜',
    type: 'date',
  },
  completed: {
    label: '완료 여부',
    type: 'check',
  },
}
