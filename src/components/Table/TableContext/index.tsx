import React, { createContext, useContext } from 'react'
import { Headers } from 'models/Todo'

interface TableContextProps<T> {
  headers: Headers[]
  sortedItems: T[]
  handleColumnSort: (column: Headers) => void
  onRowClick: (e: React.MouseEvent<HTMLTableRowElement>, item: T) => void
}

const TableContext = createContext<TableContextProps<any> | undefined>(undefined)

export const useTableContext = <T extends object>() => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider')
  }
  return context
}

export default TableContext
