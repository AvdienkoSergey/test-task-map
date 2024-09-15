// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { createI18n, useI18n } from "vue-i18n";

// Translations provided by Vuetify
import { en, srCyrl, ru } from "vuetify/locale";

// Импорт файлов переводов
import enMessages from "./i18n/en";
import ruMessages from "./i18n/ru";
import srCyrlMessages from "./i18n/srCyrl";

const messages = {
  en: {
    $vuetify: {
      ...en,
      ...enMessages,
    },
  },
  ru: {
    $vuetify: {
      ...ru,
      ...ruMessages,
    },
  },
  srCyrl: {
    $vuetify: {
      ...srCyrl,
      ...srCyrlMessages,
    },
  },
};

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: "ru",
  fallbackLocale: "ru",
  messages,
});

export default createVuetify({
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
