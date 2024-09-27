import React from 'react'
import TableCell from '../TableCell'
import { useTableContext } from '../TableContext'
import { Interpolation, Theme } from '@emotion/react'
import { observer } from 'mobx-react'

interface TableBodyProps<T> extends React.HTMLAttributes<HTMLTableSectionElement> {
  cellStyles?: {
    checkBox?: Interpolation<Theme>
    text?: Interpolation<Theme>
  }
  onCellClick?: (e: React.MouseEvent<HTMLTableCellElement>, CellItem: T, key: string) => void
}

function TableBody<T>({ cellStyles, onCellClick, ...props }: TableBodyProps<T>) {
  const { sortedItems, headers, onRowClick } = useTableContext()

  return (
    <tbody {...props}>
      {sortedItems.map((item, index: number) => (
        <tr key={index} css={styles.tr} onClick={(e) => onRowClick(e, item)}>
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
      ))}
    </tbody>
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

export default observer(TableBody)
