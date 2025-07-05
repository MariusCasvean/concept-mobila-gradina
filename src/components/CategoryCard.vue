<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()

  const { isAdminMode } = storeToRefs(appStore)

  const props = defineProps({
    category: {
      type: Object,
      required: true,
    },
  })

  function editCategory (id: number | string) {
    // Logic to edit the category
    console.log(`Edit category with ID: ${id}`)
  }

  function deleteCategory (id: number | string) {
    // Logic to delete the category
    console.log(`Delete category with ID: ${id}`)
  }
</script>

<template>
  <div class="category-card">
    <v-card>
      <v-card-title>
        {{ props.category.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ props.category.description }}
      </v-card-subtitle>

      <!-- Only for admin -->
      <v-card-actions v-if="isAdminMode">
        <v-btn color="primary" @click="editCategory(category.id)">
          Modifică
        </v-btn>
        <v-btn color="error" @click="deleteCategory(category.id)">
          Șterge
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style lang="scss">
.category-card {
  border: 1px solid red;
  border-radius: var(--border-radius-lg);
  min-height: 200px;

  .v-card {
    border-radius: var(--border-radius-top);
    // transition: transform 0.2s;
    cursor: pointer;

    &:hover {
      // transform: scale(1.05);
      // opacity: var(--opacity-hover);
    }
  }

  .v-card-title {
    text-align: center;
    white-space: normal;
    height: 40%;
    // font-weight: bold;
    // color: red;
    // border-top-right-radius: var(--border-radius-lg);
    border: 3px solid green;
  }

  .v-card-subtitle {
    border: 3px solid blue;
    height: 60%;
  }
}
</style>
