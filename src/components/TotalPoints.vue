<template>
     <div>
      Всего баллов: {{ total }}
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed} from 'vue';
import useUsersStore from '@/store/usersStore';

const usersStore = useUsersStore();

const { users } = storeToRefs(usersStore);



const total = computed(() => {
  let result = 0;
  users.value.map(user => {
    result += user.points;
  });
  return result;
});
</script>