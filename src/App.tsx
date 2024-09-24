import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useStores } from '@stores/index'
import { useLocalStorage } from '@hooks/storage/local'
import Table from './components/Table'
import { observer } from 'mobx-react'
import Button from '@common/Button'
import Flex from '@common/Flex'
import Modal from '@common/Modal'
import { ToDo } from '@models/Todo'

function App() {
  const { toDoStore } = useStores()
  const { todos } = toDoStore
  const { getLocalStorage } = useLocalStorage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<ToDo | undefined>(undefined)
  const [isEdit, setIsEdit] = useState(false)

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, item: ToDo) => {
    setSelectedTodo(item)
    setIsEdit(true)
    setIsModalOpen(true)
  }

  const handleAddClick = () => {
    setSelectedTodo(undefined)
    setIsEdit(false)
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (toDoStore.todos === null) {
      const todoData = getLocalStorage('todoData')
      if (todoData !== null) {
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
          <Table headers={toDoStore.headers} items={todos} onRowClick={handleRowClick} />
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

export default observer(App)
