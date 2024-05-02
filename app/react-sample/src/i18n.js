import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';

const options = {
   // order and from where user language should be detected
   order: ['localStorage', 'navigator'],
  caches: ['localStorage']
}

i18n
   // 使用 i18next-http-backend
   .use(Backend) 
   .use(LanguageDetector)
   // 實例化 initReactI18next
   .use(initReactI18next)
   .init({
      backend: {
         //網頁載入時去下載語言檔的位置
         loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      // 當目前的語言檔找不到對應的字詞時，會用 fallbackLng 作為預設語言
      fallbackLng: "zh-tw",
      // // 預設語言
      // lng: "zh-tw",
      interpolation: {
         // 是否要讓字詞 escaped 來防止 xss 攻擊，這裡因為 React.js 已經做了，就設成 false即可
         escapeValue: false,
      },
      detection: options
   });

export default i18n;