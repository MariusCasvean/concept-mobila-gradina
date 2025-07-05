// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const isAdminMode = ref(false)
  const key = 'isAdminMode'
  const storedValue = localStorage.getItem(key)

  if (storedValue) {
    const parsedValue = JSON.parse(storedValue)

    if (parsedValue.expiresAt && Date.now() < parsedValue.expiresAt) {
      isAdminMode.value = parsedValue.value
    } else {
      localStorage.removeItem(key)
    }
  }

  function toggleAdminMode () {
    if (isAdminMode.value) {
      localStorage.removeItem(key)
      isAdminMode.value = false
    } else {
      const expiresInMs = 24 * 60 * 60 * 1000 // 24 hours
      const expiresAt = Date.now() + expiresInMs
      localStorage.setItem(key, JSON.stringify({ value: true, expiresAt }))

      isAdminMode.value = JSON.parse(localStorage.getItem(key) || '{}').value === true
    }
  }

  return {
    isAdminMode,
    toggleAdminMode,
  }
})
