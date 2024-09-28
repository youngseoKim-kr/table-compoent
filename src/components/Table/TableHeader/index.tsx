import React, { ReactElement } from 'react'
import { TableColumnProps } from '../TableColumn'
import { Headers } from '@models/Todo'

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  hideHeader?: boolean
  headers?: Headers[]
  handleColumnSort?: (column: Headers) => void
  children?: ReactElement<TableColumnProps>
}

function TableHeader({ hideHeader, headers, handleColumnSort, children, ...props }: TableHeaderProps) {
  if (!headers || !handleColumnSort) return null

  return (
    <>
      {!hideHeader && (
        <thead {...props}>
          <tr>
            {headers.map((column, index) => (
              <React.Fragment key={index}>
                {React.isValidElement(children)
                  ? React.cloneElement(children, {
                      column,
                      onClickHeaderColumn: handleColumnSort,
                    }) // cloneElement 사용
                  : null}
              </React.Fragment>
            ))}
          </tr>
        </thead>
      )}
    </>
  )
}

export default TableHeader
