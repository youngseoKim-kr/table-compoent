import { css } from '@emotion/react'
import Text from '@common/Text'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Headers } from '@models/Todo'
import React from 'react'

export interface TableColumnProps extends React.HTMLAttributes<HTMLTableCellElement> {
  column?: Headers
  onClickHeaderColumn?: (column: Headers) => void
}

function TableColumn({ column, onClickHeaderColumn, ...props }: TableColumnProps) {
  if (!column || !onClickHeaderColumn) {
    return null
  }

  return (
    <th {...props} align="center" css={[styles.th, { cursor: column.isSortable ? 'pointer' : 'default' }]}>
      <Text typography="t3" bold={true} onClick={() => onClickHeaderColumn(column)}>
        {column.label}
      </Text>
      {column.isSortable && column.isAsc !== null ? (
        column.isAsc ? (
          <ArrowUpwardIcon css={styles.icon} />
        ) : (
          <ArrowDownwardIcon css={styles.icon} />
        )
      ) : null}
    </th>
  )
}

const styles = {
  th: css`
    padding: 8px 16px;
    border-bottom: 1px solid #e0e0e0;
  `,
  icon: css`
    font-size: 14px;
    cursor: pointer;
  `,
}

export default TableColumn
