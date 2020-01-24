import Vue from 'vue';
import ServiceCaller from '@/libs/service-caller/service-caller-vue';

class Initialise {
    constructor(Vue, store) {
        this.Vue = Vue;
        this.VueStore = store;
        this.Config = {};
        this.GetConfigFile();
    }

    GetConfigFile() {
        let self = this;

        var configURL = "config.json?" + new Date();

        console.log(self.Vue)

        self.Vue.fetchLocal(configURL)
            .then(response => response.json()).then(data => {
                self.Config = data;

                Vue.prototype.$TranslationAddress = data.TranslationAddress
                Vue.prototype.$ServerAddress = data.ServerAddress
                Vue.prototype.$SystemVersion = data.SystemVersion

                localStorage.setItem('CONFIG_FILE', JSON.stringify(data));
                self.Vue.$root.$emit('StartInitalisation');
            });
    }

    InitialiseServiceCaller() {
        let self = this;

        Vue.use(ServiceCaller, self.Config, self.VueStore);
    }
}

export default Initialise;