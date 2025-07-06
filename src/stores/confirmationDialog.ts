import { defineStore } from 'pinia'

interface ConfirmationDialogOptions {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export const useConfirmationDialog = defineStore('confirmationDialog', () => {
  const isOpen = ref(false)
  const options = ref<ConfirmationDialogOptions>({})

  function openConfirmationDialog (opts: ConfirmationDialogOptions) {
    isOpen.value = true
    options.value = opts
  }

  function closeConfirmationDialog () {
    isOpen.value = false
    options.value = {}
  }

  return {
    isOpen,
    options,
    openConfirmationDialog,
    closeConfirmationDialog,
  }
})
