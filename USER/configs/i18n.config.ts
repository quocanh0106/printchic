import UK from '../locales/UK.json'
import US from '../locales/US.json'
import DE from '../locales/DE.json'
import FR from '../locales/FR.json'
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'US',
  messages: {
    US: US,
    UK: UK,
    DE: DE,
    FR: FR
  }
}))