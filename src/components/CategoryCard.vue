<script lang="ts" setup>
  import type { PropType } from 'vue'
  import type { Category } from '@/helpers/types'
  import axios from 'axios'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { ICON_PALETTE_COLOR, URL_CATEGORIES_BASE } from '@/helpers/constants'
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

  const colorPickerDialog = ref(false)
  const colorPickerValue = ref(props.category.background)

  function openCategory (category: Category) {
    console.log(`Open category with ID: ${category.id}`)

    // TODO: check here, sa fac cu router, sau sa fac cu un continut ce il modific si raman la aceeasi route (nu prea ok)
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

  function openColorPicker (category: Category) {
    colorPickerValue.value = category.background
    colorPickerDialog.value = true
  }

  async function saveCategoryBackground (category: Category) {
    const updatedCategory = { ...category, background: colorPickerValue.value }
    try {
      await axios.put(`${URL_CATEGORIES_BASE}/${category.id}.json`, updatedCategory)
      category.background = colorPickerValue.value
      emits('update-categories')
    } catch (error) {
      console.error('Error updating category background:', error)
    } finally {
      colorPickerDialog.value = false
    }
  }
</script>

<template>
  <div class="category-card">
    <v-card elevation="3" @click="openCategory(category)">
      <v-card-title :style="{ backgroundColor: props.category.background }">
        {{ props.category.title }}
        <v-icon
          v-if="isAdminMode"
          class="edit-icon"
          :icon="ICON_PALETTE_COLOR"
          small
          @click.stop="openColorPicker(category)"
        />
      </v-card-title>
      <v-card-text>
        <img alt="Category Image" class="category-image" :src="props.category.image">
      </v-card-text>
    </v-card>

    <!-- Color Picker Dialog -->
    <v-dialog v-model="colorPickerDialog" max-width="320" persistent>
      <v-card>
        <v-card-title>Selectează culoarea de fundal</v-card-title>
        <v-card-text>
          <v-color-picker v-model="colorPickerValue" hide-canvas show-swatches />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="colorPickerDialog = false">Anulează</v-btn>
          <v-btn color="primary" @click="saveCategoryBackground(category)">Salvează</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  border-radius: var(--border-radius);

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

    .edit-icon {
      position: absolute;
      right: 4px;
      top: 3rem;
      border: 1px solid var(--primary-text-color);
      border-radius: var(--border-radius);
      padding: 12px;
      background: var(--info-color);
      z-index: 1;

      :hover {
        opacity: var(--opacity-hover);
        transform: scale(1.1);
      }
    }
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

      .edit-icon {
        top: 4rem;
      }
    }
  }
}
</style>
