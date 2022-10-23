<template>
  <div class="addUser">
    <input
      class="input"
      type="text"
      placeholder="Имя нового пользователя"
      v-model="newUser"
      v-on:keyup.enter="addUserToDb()"
    >
    <div class="button button_ml10" :class="{button_disabled: !isAdmin}" @click="addUserToDb()">Добавить</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import useUsersStore from '@/store/usersStore';
import useBaseStore from '@/store/baseStore';
import firebase from 'firebase';

const usersStore = useUsersStore();
const baseStore = useBaseStore();

const { isAdmin } = storeToRefs(baseStore);
const { users } = storeToRefs(usersStore);

const newUser = ref('');

const addUserToDb = async () => {
  if(!isAdmin.value || newUser.value.length === 0) return;
  const user = {name: newUser.value, points: 0}
  const data = await firebase.database().ref('users').push(user);
  users.value.push({...user, key: data.key});
  newUser.value = '';
}
</script>

<style scoped>
  input.input {
    width: 40%;
  }

  .addUser {
    margin-bottom: 20px;
  }
</style>