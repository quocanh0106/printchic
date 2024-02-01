import vn from '../locales/vn.json'
import en from '../locales/en.json'
import jp from '../locales/jp.json'
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: en,
    vn: vn,
    jp: jp,
  }
}))