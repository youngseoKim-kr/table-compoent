import React from 'react'
import TableColumn from '../TableColumn'
import { useTableContext } from '../TableContext'
import { observer } from 'mobx-react'

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  hideHeader?: boolean
}

function TableHeader({ hideHeader, ...props }: TableHeaderProps) {
  const { headers, handleColumnSort } = useTableContext()

  return (
    <>
      {!hideHeader && (
        <thead {...props}>
          <tr>
            {headers.map((column, index) => (
              <TableColumn onClickHeaderColumn={handleColumnSort} column={column} key={index} />
            ))}
          </tr>
        </thead>
      )}
    </>
  )
}

export default observer(TableHeader)
