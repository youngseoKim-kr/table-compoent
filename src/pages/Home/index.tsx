import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useStores } from '@stores/index'
import { useLocalStorage } from '@hooks/storage/local'
import { observer } from 'mobx-react'
import Button from '@common/Button'
import Flex from '@common/Flex'
import Modal from '@common/Modal'
import { ToDo } from '@models/Todo'
import { setLocalStorage } from '@assets/testData'
import TableHeader from '../../components/Table/TableHeader'
import TableBody from '../../components/Table/TableBody'
import Table from '../../components/Table'
import TableColumn from '../../components/Table/TableColumn'
import TableRow from '../../components/Table/TableRow'
import TableHeaderContainer from '../../components/Table/TableHeaderContainer'
import TableBodyContainer from '../../components/Table/TableBodyContainer'

function Home() {
  const { toDoStore } = useStores()
  const { getLocalStorage } = useLocalStorage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<ToDo | undefined>(undefined)
  const [isEdit, setIsEdit] = useState(false)

  const handleRowClick = useCallback((e: React.MouseEvent<HTMLTableRowElement>, item: ToDo) => {
    setSelectedTodo(item)
    setIsEdit(true)
    setIsModalOpen(true)
  }, [])

  const handleAddClick = useCallback(() => {
    setSelectedTodo(undefined)
    setIsEdit(false)
    setIsModalOpen(true)
  }, [])

  const handleCellClick = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>, CellItem: ToDo, key: string) => {
      const target = e.target as HTMLInputElement
      if (target.type === 'checkbox') {
        e.stopPropagation()
        toDoStore.editToDoItem(CellItem, key)
      }
    },
    [toDoStore],
  )

  useEffect(() => {
    setLocalStorage()
    if (toDoStore.todos === null) {
      const todoData = getLocalStorage('todoData')
      if (todoData !== null) {
        // const result = todoData.map((todoData) => {
        //   return {
        //     id: todoData.id,
        //     title: <div css={css(`color:red`)}>123123</div>,
        //     content: todoData.content,
        //     date: todoData.date,
        //     completed: todoData.completed,
        //   }
        // })
        toDoStore.setTodo(todoData)
      }
    }
  }, [])

  return (
    <>
      <div css={styles.container}>
        <div>
          <Flex justify="flex-end" style={{ width: '100%', marginBottom: '8px' }}>
            <Button weak={true} onClick={handleAddClick}>
              추가하기
            </Button>
          </Flex>
          <Table shadow="0 8px 16px rgba(0, 0, 0, 0.2)">
            <TableHeaderContainer>
              <TableHeader hideHeader={false} css={css(`color:black`)}>
                <TableColumn />
              </TableHeader>
            </TableHeaderContainer>
            <TableBodyContainer>
              <TableBody css={css(``)}>
                <TableRow
                  css={css(`border-bottom: 1px solid #e0e0e0;`)}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  cellStyles={{
                    checkBox: css`
                      border-radius: 50%;
                    `,
                    text: css`
                      width: 800px;
                    `,
                  }}
                />
              </TableBody>
            </TableBodyContainer>
          </Table>
        </div>
      </div>
      <Modal isEdit={isEdit} todo={selectedTodo} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

const styles = {
  container: css`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
}

export default observer(Home)
