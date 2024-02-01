// i18n.js

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from '~/Locales/en/translation.json'
import translationVN from '~/Locales/vn/translation.json'

const resources = {
  en: {
    translation: translationEN
  },
  vn: {
    translation: translationVN
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en', // fallback language
  interpolation: {
    escapeValue: false // react already escapes the values
  }
})

export default i18n
