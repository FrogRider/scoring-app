<template>
  <div class="button button_decline"  :class="{button_disabled: !isAdmin}"  @click="clearAll()">
    Удалить все баллы
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useUsersStore from '@/store/usersStore';
import firebase from 'firebase';
import useBaseStore from '@/store/baseStore';

const baseStore = useBaseStore();

const { isAdmin } = storeToRefs(baseStore);

const usersStore = useUsersStore();

const { users } = storeToRefs(usersStore);


const clearAll = async () => {
  if(!isAdmin.value) return;
  baseStore.showLoader();
  users.value.map(user => {
    user.points = 0;
  });
  const result = users.value.reduce((obj, cur) => ({...obj, [cur.key]: {name: cur.name, points: cur.points}}), {});
  await firebase.database().ref('users').set(result);
  baseStore.hideLoader();
};
</script>