<script lang="ts" setup>
  import axios from 'axios'
  import { URL_CATEGORIES } from '@/helpers/constants'
  import { mapResponseToData } from '@/helpers/helper'

  const state = ref({
    // TODO: add type
    categories: [] as any[],
    isLoading: false,
  })

  function getCategories () {
    state.value.isLoading = true

    axios.get(URL_CATEGORIES)
      .then(response => {
        if (!response.data) {
          // TODO: add a notification, snake bar, or toast
          console.error('Invalid response data:', response.data)
          return
        }
        state.value.categories = [...mapResponseToData(response.data), ...mapResponseToData(response.data), ...mapResponseToData(response.data), ...mapResponseToData(response.data)]
      })
      .catch(error => {
        console.error('Error fetching categories:', error)
      })
      .finally(() => {
        state.value.isLoading = false
      })
  }

  // function addNewCategory () {
  //   console.log('Add new category clicked')

  //   const category = {
  //     title: 'Garaje',
  //     description: 'Garaje de lemn',
  //     background: '#0000ff',
  //     addedOn: Date.now(),
  //     image: 'link',
  //   }

  //   axios.post(URL_CATEGORIES, category)
  //     .then(() => {
  //       getCategories() // Refresh the categories list after adding a new one
  //     })
  //     .catch(error => {
  //       console.error('Error on category POST:', error)
  //     })
  // }

  onMounted(() => {
    getCategories()
  })
</script>

<template>
  <div class="dashboard">
    <div class="section">
      <p class="section-title">Categorii de produse</p>
      <div v-if="!state.isLoading" class="section-content">
        <template
          v-for="category in state.categories"
          :key="category.id"
        >
          <category-card
            :category="category"
            :to="`/category/${category.id}`"
          />
        </template>
      </div>
      <v-progress-circular
        v-else
        indeterminate
        size="64"
        width="4"
      />
    </div>
    <!-- <v-btn @click="addNewCategory">
      Add new category
    </v-btn> -->
  </div>
</template>

<style lang="scss">
.dashboard {
  // border: 2px solid yellow;

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    .section-title {
      font-size: 24px;
      color: var(--secondary-color);
      margin-bottom: 2rem;
    }

    .section-content {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;

      // Under 768px: 2 cards per row
      @media (max-width: 767px) {
        & > * {
          flex: 1 1 calc(50% - 2rem);
          max-width: calc(50% - 2rem);
        }
      }

      // 768px to 1199px: 4 cards per row
      @media (min-width: 768px) and (max-width: 1199px) {
        & > * {
          flex: 1 1 calc(25% - 2rem);
          max-width: calc(25% - 2rem);
        }
      }

      // 1200px and above: 6 cards per row
      @media (min-width: 1200px) {
        & > * {
          flex: 1 1 calc(16.666% - 2rem);
          max-width: calc(16.666% - 2rem);
        }
      }
    }
  }
}
</style>
