import { Headers, ToDo } from 'models/Todo'
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import TableColumn from './TableColumn'
import TableRow from './TableRow'
import { observer } from 'mobx-react'

interface TableProps {
  headers: Headers[]
  items: ToDo[]
  onRowClick: (e: React.MouseEvent<HTMLTableRowElement>, item: ToDo) => void
}

function Table({ headers, items, onRowClick }: TableProps) {
  const [sortedItems, setSortedItems] = useState<ToDo[]>([])
  const [isAsc, setIsAsc] = useState(true)

  const handleSortTodo = (column: string) => () => {
    if (column === 'id') {
      // 오름차순 또는 내림차순으로 정렬
      const sorted = [...sortedItems].sort((a, b) => {
        if (a.id === null || b.id === null) return 0
        return isAsc ? a.id - b.id : b.id - a.id
      })
      setSortedItems(sorted)
      setIsAsc(!isAsc) // 정렬 방향을 토글
    }
  }

  useEffect(() => {
    setSortedItems([...items])
  }, [items])

  return (
    <table
      css={css(`
      border: 1px solid black;
      background-color: yellow;
    `)}
    >
      <thead>
        <tr>
          {headers.map((column, index: number) => (
            <TableColumn column={column.label} key={index} onSortTodo={handleSortTodo} />
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item: ToDo, index: number) => (
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
