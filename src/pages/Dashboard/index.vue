<script lang="ts" setup>
  import axios from 'axios'
  import { URL_CATEGORIES } from '@/helpers/constants'
  import { mapResponseToData } from '@/helpers/helper'

  const state = ref({
    // TODO: add type
    categories: [] as any[],
  })

  function getCategories () {
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
    <p>Acasă</p>

    <!-- <v-btn @click="addNewCategory">
      Add new category
    </v-btn> -->
  </div>
</template>

<style lang="scss">
.dashboard {
  border: 2px solid yellow;
}
</style>
