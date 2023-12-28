import { VueConstructor } from 'vue/types/umd'
import Dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';

function importLocales() {
    require('dayjs/locale/fr');
}

export default {
    install(Vue: VueConstructor): void {
        Vue.filter('formatDate', (value: string) => {
            importLocales();
            if (value) {
                return Dayjs(value).locale('fr').format(" dddd D MMMM YYYY").valueOf();
            }
            return value;
        });

        Vue.filter('formatDateTime', (value: string) => {
            importLocales();
            if (value) {
                return Dayjs(value).locale('fr').format("D MMM HH:mm").valueOf();
            }
            return value;
        });

        Vue.filter('formatTime', (value: string) => {
           importLocales();
           if (value) {
               return Dayjs(value).locale('fr').format("HH:mm").valueOf();
           }
        });

        Vue.filter('getFlag', (value: string) => {
            importLocales();
            if (value) {
                return `https://flagcdn.com/w640/${value}.png`;
            }
            return value;
        });
    }
}
