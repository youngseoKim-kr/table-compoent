import { css } from '@emotion/react'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'

function Test() {
  const rows = [
    {
      key: '1',
      name: 'Tony Reichert',
      role: 'CEO',
      status: 'Active',
    },
    {
      key: '2',
      name: 'Zoey Lang',
      role: 'Technical Lead',
      status: 'Paused',
    },
    {
      key: '3',
      name: 'Jane Fisher',
      role: 'Senior Developer',
      status: 'Active',
    },
    {
      key: '4',
      name: 'William Howard',
      role: 'Community Manager',
      status: 'Vacation',
    },
  ]

  const columns = [
    {
      key: 'name',
      label: 'NAME',
    },
    {
      key: 'role',
      label: 'ROLE',
    },
    {
      key: 'status',
      label: 'STATUS',
    },
  ]
  return (
    <div
      css={css(`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  `)}
    >
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Test
