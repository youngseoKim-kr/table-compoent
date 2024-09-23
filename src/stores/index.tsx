import { PropsWithChildren, useContext } from 'react'
import { MobXProviderContext, Provider } from 'mobx-react'
import { ToDoStore } from '@stores/modules/todoStore'

class RootStore {
  toDoStore = new ToDoStore()
}

const rootStore = new RootStore()

export const StoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider {...rootStore}>{children}</Provider>
}

export const useStores = () => {
  return useContext(MobXProviderContext) as RootStore
}
