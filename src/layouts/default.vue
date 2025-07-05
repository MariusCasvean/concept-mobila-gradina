<script lang="ts" setup>
// TODO: add code here for layout
</script>

<template>
  <Header />

  <v-main class="main-content">
    <router-view />
  </v-main>

  <Footer />
</template>

<style lang="scss">
.main-content {
  margin-top: 80px;
  min-height: calc(100vh - 80px);
  border: 3px solid red;
}
</style>
