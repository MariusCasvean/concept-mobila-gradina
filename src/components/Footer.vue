<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import {
    ADMIN_PASS,
    ICON_LOCK,
    ICON_LOCK_OPEN,
    ICON_PHONE,
    PAGE_TITLE,
  } from '@/helpers/constants'
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()
  const { isAdminMode } = storeToRefs(appStore)

  const showDialog = ref(false)
  const adminPassword = ref('')
  const errorMessage = ref('')

  const openAdminDialog = () => {
    showDialog.value = true
    adminPassword.value = ''
    errorMessage.value = ''
  }

  const onAdminSwitch = (val: boolean | null) => {
    if (!val && isAdminMode.value) {
      appStore.toggleAdminMode()
    }
  }

  const onDialogCancel = () => {
    showDialog.value = false
    adminPassword.value = ''
    errorMessage.value = ''
  }

  const onDialogOk = () => {
    if (adminPassword.value === ADMIN_PASS) {
      appStore.toggleAdminMode()
      showDialog.value = false
      adminPassword.value = ''
      errorMessage.value = ''
    } else {
      errorMessage.value = 'Parolă incorectă!'
    }
  }
</script>

<template>
  <div class="footer">
    <div class="footer-sections">
      <div class="footer-section">
        <p class="footer-section-title">
          Despre noi
        </p>
        <p class="footer-section-description">
          {{ PAGE_TITLE }} este dedicat creării de spații exterioare confortabile și elegante.
          Oferim o gamă variată de mobilier de grădină, adaptat nevoilor și preferințelor clienților noștri.
        </p>
      </div>
      <div class="footer-section">
        <p class="footer-section-title">
          Contact
        </p>
        <p class="footer-section-description">
          <span class="item"><v-icon :icon="ICON_PHONE" />0759 323 577</span>
          <!-- <span class="item"><v-icon :icon="ICON_EMAIL" />email@gmail.com</span> -->
        </p>
      </div>
      <div class="footer-section">
        <p class="footer-section-title">
          Social
        </p>
        <p class="footer-section-description">
          <a href="https://www.facebook.com/fola.claudiueugen?locale=ro_RO" rel="noopener" target="_blank">
            <img alt="Facebook" class="social" src="@/assets/images/socials/facebook1.jpg" title="Facebook">
          </a>
        </p>
      </div>
    </div>
    <div class="admin">
      <v-icon :icon="isAdminMode ? ICON_LOCK_OPEN : ICON_LOCK" />
      <span>Admin</span>
      <v-switch
        :model-value="isAdminMode"
        @click="!isAdminMode && openAdminDialog()"
        @update:model-value="onAdminSwitch"
      />
    </div>
    <v-dialog v-model="showDialog" max-width="400" persistent>
      <v-card>
        <v-card-title>Introduceți parola</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="adminPassword"
            autofocus
            clearable
            :error-messages="errorMessage"
            label="Parolă"
            type="password"
            @keydown.enter="onDialogOk"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="onDialogCancel">Anulează</v-btn>
          <v-btn :disabled="!adminPassword" @click="onDialogOk">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <p>© {{ new Date().getFullYear() }} - {{ PAGE_TITLE }}</p>
  </div>
</template>

<style lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  padding: 2rem;
  background: var(--primary-color);

  .footer-sections {
    display: flex;
    gap: 4rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .footer-section {
    display: flex;
    flex-direction: column;
    flex: 1;

    &-title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 1rem;
      text-decoration: underline;
    }

    &-description {
      .item {
        display: flex;

        .v-icon {
          margin-right: 0.5rem;
          color: var(--tertiary-color);
        }
      }
    }

    .social {
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
  }

  .admin {
    display: flex;
    align-self: flex-start;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 4rem 0;
    // opacity: var(--opacity-hover);

    .v-icon {
      color: var(--tertiary-color);
    }

    .v-switch {
      display: flex;
    }

    > * {
      margin-right: 1rem;
    }
  }
}
</style>
