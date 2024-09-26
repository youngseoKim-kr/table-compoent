import { css, Interpolation, Theme } from '@emotion/react'
import Text from '@common/Text'
import { Headers } from '@models/Todo'
import Checkbox from '@common/CheckBox'
import React from 'react'
import { observer } from 'mobx-react'

interface TableRowProps<T> {
  row: T
  itemKey: string
  type: Headers['type']
  cellStyles?: {
    checkBox?: Interpolation<Theme>
    text?: Interpolation<Theme>
  }
}

function TableRow<T>({ row, itemKey, type, cellStyles }: TableRowProps<T>) {
  // const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const result = { ...row }
  //   result[itemKey] = e.target.checked
  //   toDoStore.editTodo(result)
  // }

  return (
    <td align="center" css={styles.td}>
      {type === 'check' && (
        <Checkbox css={cellStyles?.checkBox} checked={row[itemKey]} onClick={(e) => e.stopPropagation()} />
      )}
      {(type === 'text' || type === 'date') && <Text css={cellStyles?.text}>{row[itemKey]}</Text>}
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

export default observer(TableRow)
