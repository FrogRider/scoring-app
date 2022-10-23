<template>
  <div class="users" v-auto-animate>
    <User
      v-for="(user, index) in getSortedUsers"
      :key="user.key"
      :user="user"
      :userIndex="index"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { toRefs } from 'vue';
import User from "@/components/User.vue";
import useUsersStore from '@/store/usersStore';
import { vAutoAnimate } from '@formkit/auto-animate';

const usersStore = useUsersStore();

const { getSortedUsers } = storeToRefs(usersStore);

const props = defineProps({
  users: {
    type: Array,
  },
});

const { users } = toRefs(props);

</script>

<style lang="scss">
.users {
  margin-bottom: 10px;
}
</style>