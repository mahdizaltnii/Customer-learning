import { createI18n, type I18nOptions } from 'vue-i18n'
import type availableLanguages from './available-languages.yaml'
import dateTimeFormats from './date-formats.yaml'
import numberFormats from './number-formats.yaml'
import enBase from './translations/en.yaml'
import arBase from './translations/ar.yaml'

export const i18n = createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'ar',
  messages: {
    ar: arBase
  } as I18nOptions['messages'],
  silentTranslationWarn: true,
  dateTimeFormats,
  numberFormats
})

export type Language = keyof typeof availableLanguages

export const loadedLanguages: Language[] = ['en-US']
