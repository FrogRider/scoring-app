<template>
  <div class="home">
    <!-- <p v-if="isLoading"></p> -->
    <div class="mainContent">
      <Password v-if="showPasswordComponent"/>
      <addUser/>
      <Users v-if="hasUsers" :users="users" />
      <totalPoints/> 
      <div>
        <clearAll/>
      </div>

    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, computed } from 'vue';
import useUsersStore from '@/store/usersStore';
import useBaseStore from '@/store/baseStore';
import User from "@/components/User.vue";
import Users from "@/components/Users.vue";
import addUser from "@/components/AddUser.vue";
import Password from '@/components/AdminPassword.vue'
import totalPoints from "@/components/TotalPoints.vue";
import clearAll from "@/components/ClearAll.vue";
// import { getUsers } from "@/views/firebase.js";
import firebase from 'firebase';

const usersStore = useUsersStore();
const baseStore = useBaseStore();

const { users } = storeToRefs(usersStore);

const hasUsers = computed(() => {
  return users.value.length;
});

const { isLoading, showPasswordComponent, isAdmin } = storeToRefs(baseStore);

const getUsersFromDb = async () => {
  const usersVal = await firebase.database().ref('users').once('value');
  const users = usersVal.val();
  if(!users) return [];
  return Object.entries(users).map(user => {
    return {
      key: user[0],
      name: user[1].name,
      points: user[1].points
    }
  });
}

const isUserAdmin = () => {
  if (JSON.parse(localStorage.getItem('SCORING_APP_ADMIN'))) {
    showPasswordComponent.value = false;
    isAdmin.value = true;
  }
};

onMounted(async () => {
  baseStore.showLoader();
  const usersData = await getUsersFromDb();
  users.value = usersData;
  isUserAdmin();
  baseStore.hideLoader();
})
</script>

<style lang="scss">


.mainContent {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: space-between;
}


</style>