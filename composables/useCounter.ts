import { computed, useState } from '#app'

export default function () {
  const refCount = useState('count', () => 0)
  const count = computed(() => refCount.value)
  const increment = () => {
    refCount.value++
  }
  const decrement = () => {
    refCount.value--
  }
  return { count, increment, decrement }
}
