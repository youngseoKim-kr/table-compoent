import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { useStores } from '@stores/index'
import { useLocalStorage } from '@hooks/storage/local'
import Table from './components/Table'
import { observer } from 'mobx-react'
import Button from '@common/Button'
import Flex from '@common/Flex'

const App = observer(() => {
  const { toDoStore } = useStores()
  const { getLocalStorage } = useLocalStorage()

  useEffect(() => {
    if (toDoStore.todo === null) {
      const todo = getLocalStorage('todo')
      if (todo !== null) {
        toDoStore.setTodo(todo)
      }
    }
  }, [])

  if (toDoStore.todo === null) return null

  return (
    <div css={styles.container}>
      <Flex justify="flex-end">
        <Button>추가하기</Button>
      </Flex>
      <Table headers={Object.keys(toDoStore.todo[0] || [])} items={toDoStore?.todo} />
    </div>
  )
})

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

export default App
