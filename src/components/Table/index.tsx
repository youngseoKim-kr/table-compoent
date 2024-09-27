import { Headers } from 'models/Todo'
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { colors } from '@styles/colors'
import TableContext from './TableContext'
import { observer } from 'mobx-react'

interface TableProps<T extends object> {
  headers: Headers[]
  items: T[]
  onRowClick: (e: React.MouseEvent<HTMLTableRowElement>, item: T) => void
  backgroundColor?: string
  color?: string
  borderRadius?: string
  shadow?: string
  children: React.ReactNode
}

function Table<T extends object>({
  headers: initialHeaders,
  items,
  backgroundColor = colors.white,
  color = colors.black,
  borderRadius = '8px',
  shadow,
  onRowClick,
  children,
}: TableProps<T>) {
  const [sortedItems, setSortedItems] = useState<T[] | null>(null)
  const [headers, setHeaders] = useState<Headers[]>(initialHeaders)

  const handleColumnSort = (column: Headers) => {
    if (!column.isSortable || sortedItems === null) return

    let resultSortedItems: T[] = []
    let newIsAsc: boolean | null

    if (column.isAsc === null) {
      resultSortedItems = sortedItems.slice().sort((a, b) => (a[column.key] > b[column.key] ? 1 : -1))
      newIsAsc = true
    } else if (column.isAsc) {
      resultSortedItems = sortedItems.slice().sort((a, b) => (a[column.key] < b[column.key] ? 1 : -1))
      newIsAsc = false
    } else {
      resultSortedItems = [...items]
      newIsAsc = null
    }

    const updatedHeaders = headers.map((h) =>
      h.key === column.key ? { ...h, isAsc: newIsAsc } : { ...h, isAsc: null },
    )

    setHeaders(updatedHeaders)
    setSortedItems(resultSortedItems)
  }

  useEffect(() => {
    setSortedItems(items)
  }, [items])

  if (sortedItems === null) return null
  return (
    <TableContext.Provider value={{ headers, sortedItems, handleColumnSort, onRowClick }}>
      <table
        css={css(`
        background-color: ${backgroundColor};
        color: ${color || colors.white};
        border-radius: ${borderRadius};
        box-shadow: ${shadow || 'none'};
      `)}
      >
        {children}
      </table>
    </TableContext.Provider>
  )
}

export default observer(Table)
