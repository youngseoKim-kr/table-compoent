import { css } from '@emotion/react'
import Text from '@common/Text'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

interface TableColumnProps {
  column: string
  isSortable?: boolean
  onSortTodo: (column: string) => () => void
}

function TableColumn({ column, isSortable = true, onSortTodo }: TableColumnProps) {
  return (
    <th
      key={column}
      align="center"
      css={css(`
                padding: 8px 16px;
                border-bottom: 1px solid #e0e0e0;
              `)}
    >
      <Text typography="t3" bold={true}>
        {column}
      </Text>
      {(column === 'id' || column === 'date') && isSortable && (
        <ArrowDownwardIcon
          onClick={onSortTodo(column)}
          css={css(`
              font-size: 14px;
              cursor: pointer;
              `)}
        />
      )}
    </th>
  )
}

export default TableColumn
