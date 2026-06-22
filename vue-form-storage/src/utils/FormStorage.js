// class FormStorage {
//   constructor(formId, formData) {
//     this.formId = formId
//     this.storageKey = `formData_${formId}`
//     this.formData = formData

//     this.channel = new BroadcastChannel('form_sync')

//     this.suppressBroadcast = false
//     this.debouncedSaveData = this.debounce(this.saveData, 500).bind(this)
//     FormStorageManager.register(this) // 注册实例到管理类

//     // 监听 BroadcastChannel 消息
//     this.channel.onmessage = (event) => {
//       console.log(1);
//       const { formId, data } = JSON.parse(event.data)
//       if (formId === this.formId) {
//         console.log(2);
//         // 来自其他标签的同步消息：应用数据并在短时间内抑制因数据改变而触发的保存/广播，防止循环
//         this.suppressBroadcast = true
//         this.syncData(data)
//         setTimeout(() => {
//           this.suppressBroadcast = false
//         }, 600)
//       } else if (formId === 'all') {
//         this.clearData()
//       }
//     }
//   }


//   init() {
//     this.loadData()
//   }

//   destroy() {
//     FormStorageManager.unregister(this)
//     this.channel.close()
//   }

//   saveData() {
//     const data = JSON.stringify(this.formData.value)
//     localStorage.setItem(this.storageKey, data)
//     if (!this.suppressBroadcast) {
//       this.channel.postMessage(JSON.stringify({ formId: this.formId, data: this.formData.value }))
//     }
//   }

//   debounce(func, wait) {
//     let timeout
//     return function (...args) {
//       if (this.suppressBroadcast) return
//       clearTimeout(timeout)
//       timeout = setTimeout(() => func.apply(this, args), wait)
//     }
//   }

//   loadData() {
//     const savedData = JSON.parse(localStorage.getItem(this.storageKey))
//     if (savedData) {
//       for (const key in savedData) {
//         if (Object.prototype.hasOwnProperty.call(this.formData.value, key)) {
//           this.formData.value[key] = savedData[key]
//         }
//       }
//     }
//   }

//   clearData() {
//     localStorage.removeItem(this.storageKey)
//     this.channel.postMessage(JSON.stringify({ formId: this.formId, data: null }))
//   }

//   syncData(data) {
//     if (data) {
//       for (const key in data) {
//         if (Object.prototype.hasOwnProperty.call(this.formData.value, key)) {
//           this.formData.value[key] = data[key]
//         }
//       }
//     }
//   }

//   static clearAll() {
//     const keysToRemove = Object.keys(localStorage).filter((key) => key.startsWith('formData_'))
//     keysToRemove.forEach((key) => localStorage.removeItem(key))
//     const channel = new BroadcastChannel('form_sync')
//     channel.postMessage(JSON.stringify({ formId: 'all', data: null }))
//   }
// }

// // 主要用于控制 FormStorage 类的实例
// class FormStorageManager {
//   static instances = []
//   // 判断是否是第一次初始化
//   static isInitialized = false

//   static register(instance) {
//     FormStorageManager.instances.push(instance)
//     if (!FormStorageManager.isInitialized) {
//       // 只有在第一次注册实例时才会初始化监听事件
//       window.addEventListener('beforeunload', FormStorageManager.saveAll)
//       document.addEventListener('visibilitychange', FormStorageManager.handleVisibilityChange)
//       FormStorageManager.isInitialized = true
//     }
//     console.log(FormStorageManager.instances);
//   }


//   static unRegister(instance) {
//     console.log(FormStorageManager.instances);
//   }

//   static saveAll() {
//     FormStorageManager.instances.forEach((instance) => instance.saveData())
//   }

//   static handleVisibilityChange() {
//     if (document.visibilityState === 'hidden') {
//       FormStorageManager.saveAll()
//     }
//   }

// }


// export default FormStorage

import { isEqual } from 'lodash'
class FormStorage {
  constructor(formId, formData) {
    this.formId = formId
    this.storageKey = `formData_${formId}`
    this.formData = formData
    // 每个页面新增一个独立id
    this.tabId = crypto.randomUUID()

    this.channel = new BroadcastChannel('form_sync')
    this.debouncedSaveData = this.debounce(this.saveData, 300).bind(this)
    FormStorageManager.register(this) // 注册实例到管理类

    // 监听 BroadcastChannel 消息
    this.channel.onmessage = (event) => {
      const { formId, data, sourceTabId } = JSON.parse(event.data)

      if (formId === this.formId) {
        console.log(3);

        // 页面相同但是id不同时,对比数据,数据变化才修改
        // if (sourceTabId !== this.tabId && isEqual(this.formData.value, data)) return

        this.syncData(data)
      } else if (formId === 'all') {
        this.clearData()
      }
    }
  }

  init() {
    this.loadData()
  }

  saveData() {
    console.log(2);

    const data = JSON.stringify(this.formData.value)
    localStorage.setItem(this.storageKey, data)
    this.channel.postMessage(JSON.stringify({ sourceTabId: this.tabId, formId: this.formId, data: this.formData.value }))
  }

  debounce(func, wait) {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

  loadData() {
    const savedData = JSON.parse(localStorage.getItem(this.storageKey))
    if (savedData) {
      for (const key in savedData) {
        if (Object.prototype.hasOwnProperty.call(this.formData.value, key)) {
          this.formData.value[key] = savedData[key]
        }
      }
    }
  }

  clearData() {
    localStorage.removeItem(this.storageKey)
    this.channel.postMessage(JSON.stringify({ formId: this.formId, data: null }))
  }

  syncData(data) {
    if (data) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(this.formData.value, key)) {
          this.formData.value[key] = data[key]
        }
      }
    }
  }

  static clearAll() {
    const keysToRemove = Object.keys(localStorage).filter((key) => key.startsWith('formData_'))
    keysToRemove.forEach((key) => localStorage.removeItem(key))
    const channel = new BroadcastChannel('form_sync')
    channel.postMessage(JSON.stringify({ formId: 'all', data: null }))
  }
}

// 主要用于控制 FormStorage 类的实例
class FormStorageManager {
  static instances = []
  // 判断是否是第一次初始化
  static isInitialized = false

  static register(instance) {
    FormStorageManager.instances.push(instance)
    if (!FormStorageManager.isInitialized) {
      // 只有在第一次注册实例时才会初始化监听事件
      window.addEventListener('beforeunload', FormStorageManager.saveAll)
      document.addEventListener('visibilitychange', FormStorageManager.handleVisibilityChange)
      FormStorageManager.isInitialized = true
    }
  }

  static saveAll() {
    FormStorageManager.instances.forEach((instance) => instance.saveData())
  }

  static handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      FormStorageManager.saveAll()
    }
  }
}

export default FormStorage
