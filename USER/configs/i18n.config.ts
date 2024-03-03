import vn from '../locales/vn.json'
import US from '../locales/US.json'
import jp from '../locales/jp.json'
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'US',
  messages: {
    US: US,
    vn: vn,
    jp: jp,
  }
}))