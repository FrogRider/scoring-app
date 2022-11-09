<template>
  <div>
    <input
      type="password"
      class="input"
      v-model="password"
      placeholder="Пароль адмнистратора"
      v-on:keyup.enter="validatePassword()"
    >
    <div class="button button_ml10" @click="validatePassword()">Войти</div>
    <hr>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import useBaseStore from '@/store/baseStore';
import { showNotificationMessage } from '@/utils/notifications';

const baseStore = useBaseStore();

const { showPasswordComponent, isAdmin } = storeToRefs(baseStore);

const correctPassword = 'yaadminotvechaiu';

const password = ref('');

const validatePassword = () => {
  if (password.value === correctPassword) {
    localStorage.setItem('SCORING_APP_ADMIN', true);
    showPasswordComponent.value = false;
    isAdmin.value = true;
  } else {
    showNotificationMessage('Пароль не верный', 'error')
  }
}
</script>

<style>
hr {
  margin: 10px 0;
}
</style>