<script lang="ts" setup>
import { ICON_CLOSE, ICON_MENU, PAGE_TITLE } from '../helpers/constants'

const mobileMenuOpen = ref(false)

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMenu() {
  mobileMenuOpen.value = false
}

function handleScroll() {
  if (mobileMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="header">
    <div class="header__logo">
      <a href="/">
        <img alt="Logo" src="../assets/logo_new.png">
      </a>
      <span class="header__logo-title">
        {{ PAGE_TITLE }}
      </span>
    </div>
    <div class="header__menu_mobile">
      <div class="header_menu_trigger" @click="toggleMenu">
        <v-icon :icon="ICON_MENU" size="x-large" />
        <p>Meniu</p>
      </div>
      <v-navigation-drawer
        v-model="mobileMenuOpen"
        location="right"
        class="header__drawer"
        @click:outside="closeMenu"
      >
        <div class="drawer__close-btn">
          <v-btn icon @click="closeMenu">
            <v-icon :icon="ICON_CLOSE" />
          </v-btn>
        </div>
        <div class="menu-list">
          <v-btn to="/" variant="text">Acasă</v-btn>
          <v-btn to="/about" variant="text">Despre noi</v-btn>
          <v-btn to="/contact" variant="text">Contact</v-btn>
        </div>
      </v-navigation-drawer>
    </div>
    <div class="header__menu">
      <v-btn to="/" variant="text">Acasă</v-btn>
      <v-btn to="/about" variant="text">Despre noi</v-btn>
      <v-btn to="/contact" variant="text">Contact</v-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 100;
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

    &-title {
      font-size: 1rem;
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

    .v-btn {
      margin-right: 1rem;
    }
  }

  @media only screen and (min-width: 768px) {
    &__menu_mobile {
      display: none;
    }

    &__menu {
      display: flex;
      flex-direction: row;
    }

    &__logo {
      &-title {
      font-size: 1.2rem;
      font-weight: bold;
    }
    }
  }
}

.header_menu_trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.header__drawer {
  .drawer__close-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 16px;
    margin-bottom: 80px;
    background: var(--primary-color);
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }
}
</style>
