import { css } from '@emotion/react'
import Text from '@common/Text'
import { Headers, ToDo } from '@models/Todo'
import Checkbox from '@common/CheckBox'
import React from 'react'
import { useStores } from '@stores/index'

interface TableRowProps {
  row: ToDo
  itemKey: string
  type: Headers['type']
}

function TableRow({ row, itemKey, type }: TableRowProps) {
  const { toDoStore } = useStores()

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = { ...row }
    result[itemKey] = e.target.checked
    toDoStore.editTodo(result)
  }

  return (
    <td
      align="center"
      css={css(`
                padding: 8px 16px;
                border-bottom: 1px solid #e0e0e0;
              `)}
    >
      {type === 'check' && (
        <Checkbox checked={row[itemKey]} onChange={handleCheckBox} onClick={(e) => e.stopPropagation()} />
      )}
      {(type === 'text' || type === 'date') && <Text>{row[itemKey]}</Text>}
    </td>
  )
}

export default TableRow
