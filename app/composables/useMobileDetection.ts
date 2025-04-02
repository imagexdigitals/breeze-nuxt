// composables/useMobileDetection.ts
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useMobileDetection() {
  const isMobile = ref(false)

  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768
  }

  onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize)
  })

  return {
    isMobile
  }
}
