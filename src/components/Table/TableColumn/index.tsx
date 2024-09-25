import { css } from '@emotion/react'
import Text from '@common/Text'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Headers } from '@models/Todo'

interface TableColumnProps {
  column: Headers
  onClickHeaderColumn: (column: Headers) => void
}

function TableColumn({ column, onClickHeaderColumn }: TableColumnProps) {
  return (
    <th
      align="center"
      css={css(`
                padding: 8px 16px;
                border-bottom: 1px solid #e0e0e0;
                cursor: ${column.isSortable ? 'pointer' : 'default'};
              `)}
    >
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
  icon: css`
    font-size: 14px;
    cursor: pointer;
  `,
}

export default TableColumn
