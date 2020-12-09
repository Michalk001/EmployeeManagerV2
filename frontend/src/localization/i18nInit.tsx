import Cookies from 'js-cookie';
import langPL from "./pl.json"
import langEN from "./en.json"
import i18n  from 'i18next';
import {initReactI18next} from "react-i18next";

const lang = () => {
    if (Cookies.get('lang')) {
        return Cookies.get('lang')
    }
    else {
        Cookies.set('lang', "en")
        return 'en';
    }
}

i18n.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: lang(),
    resources: {
        pl: {
            common: langPL
        },
        en: {
            common: langEN
        },
    },
});

export default i18n