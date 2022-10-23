import { defineStore } from 'pinia';

const useUsersStore = defineStore('UsersStore', {
  state: () => ({
    users: [],
  }),
  getters: {
    getSortedUsers() {
      return this.users.sort((a, b) => b.points - a.points)
    },
  },
  actions: {
    setPoints(index, points) {
      this.users[index].points = points;
    },
    removeUser(key) {
      this.users = this.users.filter(user => user.key !== key)
    },
  },
});

export default useUsersStore;
