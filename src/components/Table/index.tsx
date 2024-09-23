import { ToDo } from 'models/Todo'
import Text from '@common/Text'
import { css } from '@emotion/react'
import TableHeader from './TableHeader'

interface TableProps {
  headers: string[]
  items: ToDo[]
}

function Table({ headers, items }: TableProps) {
  return (
    <table
      css={css(`
      border: 1px solid black;
      background-color: yellow;
    `)}
    >
      <thead>
        <tr>
          {headers.map((column: string) => (
            <TableHeader column={column} />
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item: ToDo, index: number) => (
          <tr key={index}>
            {Object.keys(item).map((key) => (
              <td
                key={key}
                align="center"
                css={css(`
                padding: 8px 16px;
                border-bottom: 1px solid #e0e0e0;
              `)}
              >
                <Text>{item[key]}</Text>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
