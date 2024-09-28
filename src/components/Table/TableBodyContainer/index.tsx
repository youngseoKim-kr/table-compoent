import React, { ReactElement } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '@stores/index'
import { TableBodyProps } from '../TableBody'

interface TableBodyContainerProps<T extends object> {
  children?: ReactElement<TableBodyProps<T>>
}

function TableBodyContainerProps<T extends object>({ children }: TableBodyContainerProps<T>) {
  const { toDoStore } = useStores()
  const todoItems = toDoStore.todos as unknown as T[]
  const { headers } = toDoStore

  if (!todoItems || !headers) return null

  console.log(todoItems)

  return (
    <React.Fragment>
      {React.isValidElement(children)
        ? React.cloneElement(children, { todoItems, headers }) // cloneElement 사용
        : null}
    </React.Fragment>
  )
}

export default observer(TableBodyContainerProps)
