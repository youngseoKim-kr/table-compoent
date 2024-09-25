import { Headers } from 'models/Todo'
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import TableColumn from './TableColumn'
import TableRow from './TableRow'
import { observer } from 'mobx-react'
import { colors } from '@styles/colors'

interface TableProps<T extends object> {
  headers: Headers[]
  items: T[]
  onRowClick: (e: React.MouseEvent<HTMLTableRowElement>, item: T) => void
  backgroundColor?: string
  color?: string
  borderRadius?: string
  shadow?: string
  hideHeader?: boolean
}

function Table<T extends object>({
  headers: initialHeaders,
  items,
  backgroundColor = colors.white,
  color = colors.black,
  borderRadius = '8px',
  shadow,
  hideHeader = false,
  onRowClick,
}: TableProps<T>) {
  const [sortedItems, setSortedItems] = useState<T[] | null>(null)
  const [headers, setHeaders] = useState<Headers[]>(initialHeaders)

  const handleColumnSort = (column: Headers) => {
    if (!column.isSortable || sortedItems === null) return

    let resultSortedItems: T[] = []
    let newIsAsc: boolean | null

    if (column.isAsc === null) {
      // 오름차순 정렬
      resultSortedItems = sortedItems.slice().sort((a, b) => {
        if (a[column.key] === null || b[column.key] === null) return 0
        return a[column.key] > b[column.key] ? 1 : -1
      })
      newIsAsc = true
    } else if (column.isAsc) {
      // 내림차순 정렬
      resultSortedItems = sortedItems.slice().sort((a, b) => {
        if (a[column.key] === null || b[column.key] === null) return 0
        return a[column.key] < b[column.key] ? 1 : -1
      })
      newIsAsc = false
    } else if (!column.isAsc) {
      // 정렬 해제 (초기 상태로 복원)
      resultSortedItems = [...items]
      newIsAsc = null
    }

    const updatedHeaders = headers.map((h) => ({
      ...h,
      isAsc: h.key === column.key ? newIsAsc : h.isAsc,
    }))

    setHeaders(updatedHeaders)
    setSortedItems(resultSortedItems)
  }

  useEffect(() => {
    setSortedItems(items)
  }, [items])

  if (sortedItems === null) return null

  return (
    <table
      css={css(`
      background-color: ${backgroundColor};
      color: ${color || colors.white};
      border-radius: ${borderRadius};
      box-shadow: ${shadow || 'none'};
    `)}
    >
      <thead>
        {!hideHeader && (
          <tr>
            {headers.map((column, index: number) => (
              <TableColumn onClickHeaderColumn={handleColumnSort} column={column} key={index} />
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {sortedItems.map((item, index: number) => (
          <tr key={index} css={styles.tr} onClick={(e) => onRowClick(e, item)}>
            {Object.keys(item).map((key, keyIndex: number) => (
              <TableRow row={item} key={key} itemKey={key} type={headers[keyIndex].type} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const styles = {
  tr: css`
    cursor: pointer;
  `,
}

export default observer(Table)
