// ////////////////////////////////////////////////////////////////////////////////////////////////////
// http requests
// ////////////////////////////////////////////////////////////////////////////////////////////////////

let Axios = require("axios");

class AAxios {
    constructor() {
        this.getConfigData();
        this.Config = null;
    }

    getConfigData() {
        if (localStorage["Config"] == null) {
            var configURL = "config.json?" + new Date();
            fetchLocal(configURL)
                .then(response => response.json()).then(data => {
                    // First init config file then call this
                    self.Config = data;
                    localStorage["Config"] = JSON.stringify(data);
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    fetchLocal(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest
            xhr.onload = function () {
                resolve(new Response(xhr.responseText));
            }
            xhr.onerror = function () {
                reject(new TypeError('Local request failed'))
            }
            xhr.open('GET', url)
            xhr.send(null)
        })
    }

    /**
     * get
     * @param {*} route 
     * @param {*} body 
     * @param {*} useAuth - defaulted to true, can override on requese
     */
    static get(route, body, useAuth = true) {
        let self = this;

        return new Promise((resolve, reject) => {
            if (useAuth == true) {
                self.getAuthorization()
                    .then(token => {

                        Axios.defaults.headers.common['Authorization'] = "bearer " + token;

                        Axios.get(self.Config.ServerAddress + '/' + route, body)
                            .then(r => {
                                delete Axios.defaults.headers.common["Authorization"];
                                resolve(r);
                            })
                            .catch(e => {
                                delete Axios.defaults.headers.common["Authorization"];
                                reject(e);
                            })
                    })
                    .catch(() => {
                        reject();
                    })
            } else {
                Axios.get(self.Config.ServerAddress + '/' + route, body)
                    .then(r => {
                        resolve(r);
                    })
                    .catch(e => {
                        reject(e);
                    })
            }
        })
    }

    /**
     * post
     * @param {*} route 
     * @param {*} body 
     * @param {*} useAuth - defaulted to true, can override on requese
     */
    static post(route, body, useAuth = true) {
        let self = this;

        return new Promise((resolve, reject) => {
            if (useAuth == true) {
                self.getAuthorization()
                    .then(token => {

                        Axios.defaults.headers.common['Authorization'] = "bearer " + token;

                        Axios.post(self.Config.ServerAddress + '/' + route, body)
                            .then(r => {
                                delete Axios.defaults.headers.common["Authorization"];
                                resolve(r);
                            })
                            .catch(e => {
                                delete Axios.defaults.headers.common["Authorization"];
                                reject(e);
                            })
                    })
                    .catch(() => {
                        reject();
                    })
            } else {
                Axios.post(self.Config.ServerAddress + '/' + route, body)
                    .then(r => {
                        resolve(r);
                    })
                    .catch(e => {
                        reject(e);
                    })
            }
        })
    }

    /**
     * put
     * @param {*} route 
     * @param {*} body 
     * @param {*} useAuth - defaulted to true, can override on requese
     */
    static put(route, body, useAuth = true) {
        let self = this;

        return new Promise((resolve, reject) => {
            if (useAuth == true) {
                self.getAuthorization()
                    .then(token => {

                        Axios.defaults.headers.common['Authorization'] = "bearer " + token;

                        Axios.put(self.Config.ServerAddress + '/' + route, body)
                            .then(r => {
                                delete Axios.defaults.headers.common["Authorization"];
                                resolve(r);
                            })
                            .catch(e => {
                                delete Axios.defaults.headers.common["Authorization"];
                                reject(e);
                            })
                    })
                    .catch(() => {
                        reject();
                    })
            } else {
                Axios.put(self.Config.ServerAddress + '/' + route, body)
                    .then(r => {
                        resolve(r);
                    })
                    .catch(e => {
                        reject(e);
                    })
            }
        })
    }

    /**
     * delete
     * @param {*} route 
     * @param {*} body 
     * @param {*} useAuth - defaulted to true, can override on requese
     */
    static delete(route, body, useAuth = true) {
        let self = this;

        return new Promise((resolve, reject) => {
            if (useAuth == true) {
                self.getAuthorization()
                    .then(token => {

                        Axios.defaults.headers.common['Authorization'] = "bearer " + token;

                        Axios.delete(self.Config.ServerAddress + '/' + route, body)
                            .then(r => {
                                delete Axios.defaults.headers.common["Authorization"];
                                resolve(r);
                            })
                            .catch(e => {
                                delete Axios.defaults.headers.common["Authorization"];
                                reject(e);
                            })
                    })
                    .catch(() => {
                        reject();
                    })
            } else {
                Axios.delete(self.Config.ServerAddress + '/' + route, body)
                    .then(r => {
                        resolve(r);
                    })
                    .catch(e => {
                        reject(e);
                    })
            }
        })
    }

    /**
     * 
     */
    static getAuthorization() {
        let self = this;

        let refreshToken = localStorage.refreshToken;

        return new Promise((resolve, reject) => {

            Axios.get(self.Config.ServerAddress + "Authentication?strToken=" + refreshToken)
                .then(r => {
                    localStorage.setItem('accessToken', r.data.accessToken);
                    localStorage.setItem('refreshToken', r.data.refreshToken);
                    resolve(r.data.accessToken);
                })
                .catch(e => {
                    reject(false);
                });
        })
    }
}

export default {
    install(Vue, configData) {
        let caller = new AAxios(configData);

        Vue.prototype.get = (route, body) => {
            return caller.get(route, body);
        };

        Vue.prototype.post = (route, body) => {
            return caller.post(route, body);
        };

        Vue.prototype.put = (route, body) => {
            return caller.put(route, body);
        };

        Vue.prototype.delete = (route, body) => {
            return caller.delete(route, body);
        };
    }
}