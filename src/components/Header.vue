<script lang="ts" setup>
  import { BASE_URL, PAGE_TITLE } from '../helpers/constants'

</script>

<template>
  <div class="header">
    <div class="header__logo">
      <a href="/">
        <img alt="Logo" src="../assets/logo_new.png">
      </a>
      {{ PAGE_TITLE }} - {{ BASE_URL }}
    </div>
    <div class="header__menu">
      <v-btn to="/" variant="text">Acasă</v-btn>
      <v-btn to="/about" variant="text">Despre noi</v-btn>
      <v-btn to="/contact" variant="text">Contact</v-btn>
      <!-- <v-btn to="/product/1" color="primary" variant="text">Product Details</v-btn> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 40px;
  background-color: var(--primary-color);

  &__logo {
    display: flex;
    align-items: center;

    img {
      height: 40px;
      width: 40px;
      margin-right: 20px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__menu {
    border: 1px solid red;
  }
}
</style>
