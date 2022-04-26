import { computed, ref } from '@nuxtjs/composition-api'

export default function () {
  const refCount = ref(0)
  const count = computed(() => refCount.value)
  const increment = () => {
    refCount.value++
  }
  const decrement = () => {
    refCount.value--
  }
  return { count, increment, decrement }
}
