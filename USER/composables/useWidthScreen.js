// composables/useWidthScreen.js
import { ref, onMounted, onUnmounted, computed } from 'vue';

export default function useWidthScreen() {
  const screenWidth = ref(0);

  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
  });

  const mobile = computed(() => screenWidth.value <= 600 && screenWidth.value > 0);
  const tablet = computed(() => screenWidth.value > 600 && screenWidth.value <= 992);
  const pc = computed(() => screenWidth.value > 992 && screenWidth.value <= 2000);
  const lgPc = computed(() => screenWidth.value > 2000 && screenWidth.value <= 2500);
  const extraPc = computed(() => screenWidth.value > 2500);

  const getRequest = async (endpoint) => {
    const response = await $fetch(`http://printchic-api.tvo-solution.net/auth/${endpoint}`);
    return response;
  };

  const postRequest = async (endpoint, data) => {
    const response = await $fetch(`http://printchic-api.tvo-solution.net/auth/${endpoint}`, {
      method: 'POST',
      body: data,
    });
    return response;
  };

  return {
    screenWidth,
    mobile,
    tablet,
    pc,
    lgPc,
    extraPc,
    getRequest,
    postRequest,
  };
}
