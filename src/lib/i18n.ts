import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'RAION 雷音',
      tagline: 'Feel the Thunder',
      welcome: 'Welcome to RAION',
      genres: 'Genres',
      radio: 'Radio',
      library: 'Library',
      games: 'Games',
      settings: 'Settings',
      play: 'Play',
      pause: 'Pause',
      nowPlaying: 'Now Playing',
    },
  },
  ja: {
    translation: {
      appName: 'RAION 雷音',
      tagline: '雷を感じろ',
      welcome: 'RAIONへようこそ',
      genres: 'ジャンル',
      radio: 'ラジオ',
      library: 'ライブラリ',
      games: 'ゲーム',
      settings: '設定',
      play: '再生',
      pause: '一時停止',
      nowPlaying: '再生中',
    },
  },
  // Add other languages as needed
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
