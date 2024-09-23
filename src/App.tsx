import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { useStores } from '@stores/index'
import { useLocalStorage } from '@hooks/storage/local'
import Table from './components/Table'

function App() {
  const { toDoStore } = useStores()
  const { getLocalStorage } = useLocalStorage()

  useEffect(() => {
    if (toDoStore.todo === null) {
      const todo = getLocalStorage('todo')
      if (todo === null) return
      toDoStore.setTodo(todo)
    }
  }, [])

  return (
    <div css={styles.container}>
      <Table />
    </div>
  )
}

const styles = {
  container: css`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
}

export default App
