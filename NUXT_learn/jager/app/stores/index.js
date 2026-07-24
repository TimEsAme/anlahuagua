import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      userList: [],
    };
  },
  getters: {
    getUserList: (state) => state.userList,
  },
  actions: {
    async fetchUser() {
      const data = await $fetch("/api/users");
      this.userList = data;
    },
    async getUserById(id) {
      const res = await $fetch(`/api/users/${id}`);
      return res;
    },
    async editUserById(id, user) {
      await $fetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "content-Type": "application/json",
        },
      });

      // const index = this.userList.findIndex((item) => item.id === id);
      // this.userList[index] = user;
    },

    async addUser(user) {
      user.id = crypto.randomUUID(); // 先生成一个随机的id
      // this.userList.push(user);
      await $fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "content-Type": "application/json",
        },
      });
    },

    async deleteUserById(id) {
      // const index = this.userList.findIndex((item) => item.id === id);
      // this.userList.splice(index, 1);
      await $fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
    },
  },
});
