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
        state.value.categories = mapResponseToData(response.data)
      })
      .catch(error => {
        console.error('Error fetching categories:', error)
      })
      .finally(() => {
        state.value.isLoading = false
      })
  }

  function addNewCategory () {
    console.log('Add new category clicked')

    const category = {
      title: 'Leagane',
      description: 'leagane pentru soare pei si scaune , pentru gradina, si pentru o maxima relaxare, pentru relaxare',
      background: '#de00ff',
      addedOn: Date.now(),
      image: 'https://c.cdnmp.net/623839381/p/l/7/leagan-de-gradina-lemn-pin-tratat-fsc-215-x-171-x-180-cm~687437.jpg',
    }

    axios.post(URL_CATEGORIES, category)
      .then(() => {
        getCategories() // Refresh the categories list after adding a new one
      })
      .catch(error => {
        console.error('Error on category POST:', error)
      })
  }

  onMounted(() => {
    getCategories()
  })
</script>

<template>
  <div class="dashboard">
    <ConfirmationDialog />
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
            @update-categories="getCategories"
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
    <v-btn class="mt-10" @click="addNewCategory">
      Add new category
    </v-btn>
  </div>
</template>

<style lang="scss">
.dashboard {
  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    .section-title {
      font-size: 1.2rem;
      color: var(--secondary-color);
      margin-bottom: 2rem;
    }

    .section-content {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 3rem;
    }
  }
}
</style>
