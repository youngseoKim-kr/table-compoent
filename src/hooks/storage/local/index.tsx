import { StorageType } from '@hooks/storage/interface'
import { useCallback } from 'react'

export const useLocalStorage = () => {
  const setLocalStorage = useCallback(<K extends keyof StorageType>(key: K, value: StorageType[K]) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [])

  const getLocalStorage = useCallback(<K extends keyof StorageType>(key: K): StorageType[K] | null => {
    const item = localStorage.getItem(key)

    try {
      if (item === null) {
        throw new Error('item is null')
      }

      return JSON.parse(item)
    } catch (e) {
      return null
    }
  }, [])

  const removeLocalStorage = useCallback(<K extends keyof StorageType>(key: K) => {
    localStorage.removeItem(key)
  }, [])

  const clearLocalStorage = useCallback(() => {
    localStorage.clear()
  }, [])

  return { getLocalStorage, setLocalStorage, removeLocalStorage, clearLocalStorage }
}
