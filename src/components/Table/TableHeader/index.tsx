import { css } from '@emotion/react'
import Text from '@common/Text'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

interface TableHeaderProps {
  column: string
  isSortable?: boolean
}

function TableHeader({ column, isSortable = true }: TableHeaderProps) {
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
          css={css(`
              font-size: 14px;
              cursor: pointer;
              `)}
        />
      )}
    </th>
  )
}

export default TableHeader
