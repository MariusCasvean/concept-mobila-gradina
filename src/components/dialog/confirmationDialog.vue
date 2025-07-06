<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useConfirmationDialog } from '@/stores/confirmationDialog'

  const confirmationDialog = useConfirmationDialog()
  const { isOpen, options } = storeToRefs(confirmationDialog)

  function handleConfirm () {
    if (options.value.onConfirm) options.value.onConfirm()
    confirmationDialog.closeConfirmationDialog()
  }

  function handleCancel () {
    if (options.value.onCancel) options.value.onCancel()
    confirmationDialog.closeConfirmationDialog()
  }
</script>

<template>
  <v-dialog v-model="isOpen" max-width="600" persistent>
    <v-card>
      <v-card-title class="headline">{{ options.title || 'Confirmare' }}</v-card-title>
      <v-card-text>
        {{ options.message || 'Ești sigur?' }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="handleCancel">
          {{ options.cancelText }}
        </v-btn>
        <v-btn color="primary" text @click="handleConfirm">
          {{ options.confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="css" scoped>
.headline {
  text-align: center;
}
</style>
