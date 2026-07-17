import { onServerPrefetch, onMounted } from 'vue'

export const useData = (cb) => {
  if (import.meta.env.SSR) {
    return onServerPrefetch(cb)
  }

  return onMounted(cb)
}
