<script lang="ts" setup>
  import type { PropType } from 'vue'
  import type { Category } from '@/helpers/types'
  import axios from 'axios'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { URL_CATEGORIES_BASE } from '@/helpers/constants'
  import { useAppStore } from '@/stores/app'
  import { useConfirmationDialog } from '@/stores/confirmationDialog'

  const appStore = useAppStore()
  const confirmationDialog = useConfirmationDialog()
  const router = useRouter()

  const { isAdminMode } = storeToRefs(appStore)
  const props = defineProps({
    category: {
      type: {} as PropType<Category>,
      required: true,
    },
  })

  const emits = defineEmits(['update-categories'])

  function openCategory (category: Category) {
    console.log(`Open category with ID: ${category.id}`)

    router.push({ path: `/${category.title}` })
  }

  function editCategory (category: Category) {
    console.log(`Edit category with ID: ${category.id}`)
  }

  function deleteCategoryConfirmation (category: Category) {
    confirmationDialog.openConfirmationDialog({
      title: 'Confirmare ștergere',
      message: `Ești sigur că vrei să ștergi categoria "${category.title}"?`,
      cancelText: 'Anulează',
      confirmText: 'Șterge',
      onConfirm: () => deleteCategory(category.id),
    })
  }

  function deleteCategory (id: number | string) {
    axios.delete(`${URL_CATEGORIES_BASE}/${id}.json`)
      .catch(error => {
        console.error('Error delete category:', error)
      })
      .finally(() => {
        emits('update-categories')
      })
  }
</script>

<template>
  <div class="category-card">
    <v-card @click="openCategory(category)">
      <v-card-title>
        {{ props.category.title }}
      </v-card-title>
      <v-card-text>
        <img alt="Category Image" class="category-image" :src="props.category.image">
      </v-card-text>
    </v-card>

    <!-- Only for admin -->
    <div v-if="isAdminMode" class="admin-actions">
      <v-btn color="primary" size="x-small" @click="editCategory(category)">
        Modifică
      </v-btn>
      <v-btn color="var(--accent-color)" size="x-small" @click="deleteCategoryConfirmation(category)">
        Șterge
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
.category-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 200px;
  min-height: 200px;
  max-height: 200px;
  max-width: 160px;
  width: 100%;
  cursor: pointer;

  .v-card {
    border-radius: var(--border-radius);
    height: 100%;
  }

  .v-card-title {
    text-align: center;
    font-size: 0.8rem;
    white-space: normal;
    height: 28%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding: 12px;
  }

  .v-card-text {
    display: flex;
    padding: 0;
    height: 72%;
    background: white;
    overflow: hidden;

    img {
      width: 100%;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .admin-actions {
    position: absolute;
    display: flex;
    justify-content: center;
    left: 0;
    right: 0;
    bottom: -1.6rem;
    gap: 0.5rem;

    > * {
      flex: 1;
    }
  }

  @media only screen and (min-width: 768px) {
    .v-card-title {
      font-size: 1rem;
      height: 34%;
    }
  }
}
</style>
