// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationTH from "./locales/th/translation.json";

const resources = {
    en: {
        translation: translationEN,
    },
    th: {
        translation: translationTH,
    },
};

i18n
    .use(LanguageDetector) // ใช้งานตัวตรวจจับภาษา (เพื่อให้จำค่าภาษาได้)
    .use(initReactI18next) // เชื่อมต่อกับ React
    .init({
        resources,
        fallbackLng: "en", // ถ้าหาภาษาไม่เจอ ให้ใช้ภาษาอังกฤษเป็นหลัก
        debug: true, // เปิดดู log ใน console (ปิดได้เมื่อขึ้น production)

        interpolation: {
            escapeValue: false, // React ป้องกัน XSS ให้อยู่แล้ว
        },
    });

export default i18n;