"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * 本地存储Hook
 * 用于实现表单草稿的本地暂存功能
 */

interface UseLocalStorageOptions<T> {
  key: string
  defaultValue: T
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
}

export function useLocalStorage<T>({
  key,
  defaultValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}: UseLocalStorageOptions<T>) {
  // 获取初始值
  const getInitialValue = useCallback((): T => {
    if (typeof window === "undefined") return defaultValue
    
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        return deserialize(item)
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
    }
    return defaultValue
  }, [key, defaultValue, deserialize])

  const [storedValue, setStoredValue] = useState<T>(getInitialValue)
  const [isHydrated, setIsHydrated] = useState(false)

  // 客户端挂载后标记为已hydrate
  useEffect(() => {
    setIsHydrated(true)
    setStoredValue(getInitialValue())
  }, [getInitialValue])

  // 保存到localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, serialize(valueToStore))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue, serialize]
  )

  // 从localStorage删除
  const removeValue = useCallback(() => {
    try {
      setStoredValue(defaultValue)
      
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, defaultValue])

  return {
    value: storedValue,
    setValue,
    removeValue,
    isHydrated,
  }
}
