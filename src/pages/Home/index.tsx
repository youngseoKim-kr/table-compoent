import React, { useEffect, useState } from 'react'
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

function Home() {
  const { toDoStore } = useStores()
  const { todos, headers } = toDoStore
  const { getLocalStorage } = useLocalStorage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<ToDo | undefined>(undefined)
  const [isEdit, setIsEdit] = useState(false)

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, item: ToDo) => {
    console.log(77, item)
    setSelectedTodo(item)
    setIsEdit(true)
    setIsModalOpen(true)
  }

  const handleAddClick = () => {
    setSelectedTodo(undefined)
    setIsEdit(false)
    setIsModalOpen(true)
  }

  const handleCellClick = (e: React.MouseEvent<HTMLTableCellElement>, CellItem: ToDo, key: string) => {
    const target = e.target as HTMLInputElement
    if (target.type === 'checkbox') {
      e.stopPropagation()
      toDoStore.editToDoItem(CellItem, key)
    }
  }

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

  if (todos === null) return null

  return (
    <>
      <div css={styles.container}>
        <div>
          <Flex justify="flex-end" style={{ width: '100%', marginBottom: '8px' }}>
            <Button weak={true} onClick={handleAddClick}>
              추가하기
            </Button>
          </Flex>
          <Table headers={headers} items={todos} shadow="0 8px 16px rgba(0, 0, 0, 0.2)" onRowClick={handleRowClick}>
            <TableHeader hideHeader={false} css={css(`color:black`)} />
            <TableBody
              onCellClick={handleCellClick}
              css={css(``)}
              cellStyles={{
                checkBox: css`
                  border-radius: 50%;
                `,
                text: css`
                  width: 800px;
                `,
              }}
            />
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
