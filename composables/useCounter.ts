import { ref } from '@nuxtjs/composition-api'

export default function () {
  const count = ref(0)
  const increment = () => {
    count.value++
  }
  const decrement = () => {
    count.value--
  }
  return { count, increment, decrement }
}
