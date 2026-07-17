import { defineStore } from 'pinia'
import { getUserByIdApi } from '../api/userApi.js'

export const useDetailStore = defineStore('detailStore', {
  // 定义状态
  state: () => {
    return {
      user: {
        name: '',
        age: '',
        phone: '',
        email: '',
        education: '',
        graduationschool: '',
        profession: '',
        profile: ''
      }
    }
  },
  // 定义修改状态的方法
  actions: {
    // 根据 id 返回用户信息
    async getUserById(id) {
      const res = await getUserByIdApi(id)
      this.user = res.data
      return res
    }
  }
})
