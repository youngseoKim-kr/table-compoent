import React, { ReactElement } from 'react'
import { TableRowProps } from '../TableRow'
import { Headers } from '@models/Todo'

export interface TableBodyProps<T extends object> extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactElement<TableRowProps<T>>
  todoItems?: T[]
  headers?: Headers[]
}

function TableBody<T extends object>({ todoItems, headers, children, ...props }: TableBodyProps<T>) {
  if (!todoItems || !headers) return null

  return (
    <tbody {...props}>
      {todoItems.map((item, index: number) => (
        <React.Fragment key={index}>
          {React.isValidElement(children) ? React.cloneElement(children, { headers, item }) : null}
        </React.Fragment>
      ))}
    </tbody>
  )
}

export default TableBody
