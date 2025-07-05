<script lang="ts" setup>
  import { ICON_MENU, PAGE_TITLE } from '../helpers/constants'


function toggleMenu() {
    console.log('Menu toggled')
  }
</script>

<template>
  <div class="header">
    <div class="header__logo">
      <a href="/">
        <img alt="Logo" src="../assets/logo_new.png">
      </a>
      {{ PAGE_TITLE }}
    </div>
    <div class="header__menu_mobile">
      <v-icon :icon="ICON_MENU" size="x-large" @click="toggleMenu" />
      <!-- <v-btn to="/" variant="text">Acasă mobile</v-btn> -->
      <!-- <v-btn to="/about" variant="text">Despre noi mo</v-btn>
      <v-btn to="/contact" variant="text">Contact mo</v-btn> -->
      <!-- <v-btn to="/product/1" color="primary" variant="text">Product Details</v-btn> -->
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
  padding: 0 20px;
  background-color: var(--primary-color);
  // background-image: url('../assets/images/header/3.png');
  // background-size: cover;
  // background-position: center;

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

  &__menu_mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  &__menu {
    display: none;
  }

  @media only screen and (min-width: 768px) {
    &__menu_mobile {
      display: none;
    }

    &__menu {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
