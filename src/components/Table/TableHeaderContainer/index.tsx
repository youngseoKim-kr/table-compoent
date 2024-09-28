import React, { ReactElement } from 'react'
import { TableHeaderProps } from '../TableHeader'
import { observer } from 'mobx-react'
import { useStores } from '@stores/index'
import { Headers } from '@models/Todo'

interface TableHeaderContainerProps {
  children?: ReactElement<TableHeaderProps>
}

function TableHeaderContainer({ children }: TableHeaderContainerProps) {
  const { toDoStore } = useStores()
  const { headers } = toDoStore

  const handleColumnSort = (column: Headers) => {
    toDoStore.sortToDoItem(column)
  }

  return (
    <React.Fragment>
      {React.isValidElement(children)
        ? React.cloneElement(children, { headers, handleColumnSort }) // cloneElement 사용
        : null}
    </React.Fragment>
  )
}

export default observer(TableHeaderContainer)