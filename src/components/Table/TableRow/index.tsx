import { css } from '@emotion/react'
import Text from '@common/Text'
import { Headers } from '@models/Todo'
import Checkbox from '@common/CheckBox'
import React from 'react'
import { observer } from 'mobx-react'

interface TableRowProps<T> {
  row: T
  itemKey: string
  type: Headers['type']
}

function TableRow<T>({ row, itemKey, type }: TableRowProps<T>) {
  // const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const result = { ...row }
  //   result[itemKey] = e.target.checked
  //   toDoStore.editTodo(result)
  // }

  return (
    <td
      align="center"
      css={css(`
                padding: 8px 16px;
                min-width: 100px;
                border-bottom: 1px solid #e0e0e0;
              `)}
    >
      {type === 'check' && <Checkbox checked={row[itemKey]} onClick={(e) => e.stopPropagation()} />}
      {(type === 'text' || type === 'date') && <Text>{row[itemKey]}</Text>}
    </td>
  )
}

export default observer(TableRow)
