// composables/useLanguage.js
import { ref, onMounted } from 'vue';

export default function useLanguage() {
  const currentLanguage = ref('US'); // Default language

  onMounted(() => {
    if (process.client) {
      const storedLanguage = localStorage.getItem('currentLanguage');
      if (storedLanguage) {
        currentLanguage.value = storedLanguage;
      }
    }
  });

  const setLanguage = (lang) => {
    currentLanguage.value = lang;
    if (process.client) {
      localStorage.setItem('currentLanguage', lang);
    }
  };

  return { currentLanguage, setLanguage };
}
