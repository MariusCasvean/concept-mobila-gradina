<script lang="ts" setup>
  import axios from 'axios'
  import { storeToRefs } from 'pinia'
  import { ICON_EDIT, URL_ABOUT } from '@/helpers/constants'
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()
  const { isAdminMode } = storeToRefs(appStore)
  const state = ref({
    about: '',
    aboutCopy: '',
    isEditMode: false,
    isLoading: false,
  })

  async function getAboutData () {
    try {
      state.value.isLoading = true
      const response = await axios.get(URL_ABOUT)
      state.value.about = response.data.text
      state.value.aboutCopy = state.value.about // Store a copy for later use
      state.value.isLoading = false
    } catch (error) {
      console.log('error on fetch about data:', error)
      state.value.isLoading = false
    }
  }

  function toggleEditMode () {
    state.value.isEditMode = true
  }

  function cancelChanges () {
    state.value.isEditMode = false
    state.value.about = state.value.aboutCopy // Revert to the original data
  }

  function saveChanges () {
    axios.put(URL_ABOUT, { text: state.value.about })
      .then(() => {
        state.value.isEditMode = false
        getAboutData() // Refresh the about data
      })
      .catch(error => {
        console.error('Error saving about data:', error)
      })
  }

  onMounted(() => {
    getAboutData()
  })
</script>

<template>
  <div class="about">
    <p class="intro">
      Salutare și bine te-am găsit 👋
    </p>
    <div v-if="state.isLoading" class="d-flex justify-center">
      <v-progress-circular
        indeterminate
        size="48"
        width="4"
      />
    </div>
    <template v-else>
      <div v-if="isAdminMode && state.isEditMode" class="text-field">
        <v-textarea v-model="state.about" />
      </div>
      <div v-else>
        {{ state.about }}
      </div>
    </template>
    <div v-if="isAdminMode" class="actions">
      <v-icon
        v-if="!state.isEditMode"
        class="edit-icon"
        :icon="ICON_EDIT"
        small
        @click="toggleEditMode"
      />
      <div v-if="state.isEditMode" class="buttons">
        <v-btn
          color="grey"
          @click="cancelChanges"
        >
          Anulează
        </v-btn>
        <v-btn
          color="success"
          @click="saveChanges"
        >
          Salvează
        </v-btn>
      </div>
    </div>
    <p>
      Pentru orice nelamurire, informatie sau chiar o discutie de consultanta, pentru a identifica nevoia dumneavoastra, nu ezita să ne contactezi fie telefonic, fie la adresa de email sau pe platformele de socializare.
    </p>
  </div>
</template>

<style lang="scss">
.about {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  .intro {
    font-size: 1.2rem;
  }

  .text-field {
    width: 100%;
    margin-top: 1rem;
  }

  .actions {
    position: relative;

    .edit-icon {
      position: absolute;
      top: -1.5rem;

      border: 1px solid var(--primary-text-color);
      border-radius: var(--border-radius);
      padding: 12px;
      background: var(--info-color);
      z-index: 1;
    }

    .buttons {
      display: flex;
      gap: 2rem;
    }
  }
}
</style>
