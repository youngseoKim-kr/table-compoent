import { css, Interpolation, Theme } from '@emotion/react'
import Text from '@common/Text'
import { Headers } from '@models/Todo'
import Checkbox from '@common/CheckBox'
import React from 'react'

interface TableRowProps<T> extends React.HTMLAttributes<HTMLTableCellElement> {
  cellItem: T
  itemKey: string
  type: Headers['type']
  cellStyles?: {
    checkBox?: Interpolation<Theme>
    text?: Interpolation<Theme>
  }
  onCellClick?: (e: React.MouseEvent<HTMLTableCellElement>, CellItem: T, key: string) => void
}

function TableCell<T>({ cellItem, itemKey, type, cellStyles, onCellClick, ...props }: TableRowProps<T>) {
  const value = cellItem[itemKey]

  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    if (onCellClick) {
      // 추가 매개변수는 클로저로 처리
      onCellClick(e, cellItem, itemKey)
    }
  }

  const renderCellContent = () => {
    if (React.isValidElement(value)) {
      return value
    }

    if (type === 'check') {
      return <Checkbox css={cellStyles?.checkBox} checked={value} readOnly />
    }

    if (type === 'text' || type === 'date') {
      return <Text css={cellStyles?.text}>{value}</Text>
    }

    return null
  }

  return (
    <td align="center" css={styles.td} {...props} onClick={handleClick}>
      {renderCellContent()}
    </td>
  )
}

const styles = {
  td: css`
    padding: 8px 16px;
    min-width: 100px;
    border-bottom: 1px solid #e0e0e0;
  `,
}

export default TableCell
