import TableCell from '../TableCell'
import React from 'react'
import { Headers } from '@models/Todo'
import { Interpolation, Theme } from '@emotion/react'

export interface TableRowProps<T> {
  headers?: Headers[]
  onRowClick?: (e: React.MouseEvent<HTMLTableRowElement>, item: T) => void
  onCellClick?: (e: React.MouseEvent<HTMLTableCellElement>, CellItem: T, key: string) => void
  item?: T
  cellStyles?: {
    checkBox?: Interpolation<Theme>
    text?: Interpolation<Theme>
  }
}

function TableRow<T>({ headers, item, cellStyles, onRowClick, onCellClick }: TableRowProps<T>) {
  if (!headers || !onRowClick || !item) return null

  return (
    <tr css={styles.tr} onClick={(e) => onRowClick(e, item)}>
      {headers.map((header, headerKeyIndex: number) => (
        <TableCell
          key={headerKeyIndex}
          cellItem={item}
          itemKey={header.key}
          type={header.type}
          cellStyles={cellStyles}
          onCellClick={onCellClick}
        />
      ))}
    </tr>
  )
}

const styles = {
  tr: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f9f9f9',
    },
  },
}

export default TableRow
