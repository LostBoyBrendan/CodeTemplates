// ////////////////////////////////////////////////////////////////////////////////////////////////////
// http requests
// ////////////////////////////////////////////////////////////////////////////////////////////////////

let Axios = require("axios");

class AAxios {
  constructor(configData) {
    this.Config = configData;
  }

  /**
   * get
   * @param {*} route 
   * @param {*} body 
   * @param {*} useAuth - defaulted to true, can override on requese
   */
  get(VueStore, route, body, useAuth = true) {
    let self = this;

    return new Promise((resolve, reject) => {
      if (useAuth == true) {
        self.getAuthorization(VueStore)
          .then(token => {
            Axios.defaults.headers.common['Authorization'] = "bearer " + token;

            Axios.get(self.Config.ServerAddress + route, body)
              .then(r => {
                delete Axios.defaults.headers.common["Authorization"];
                resolve(r);
              })
              .catch(e => {
                delete Axios.defaults.headers.common["Authorization"];
                reject(e);
              })
          })
          .catch(e => {
            reject(e);
          })
      } else {
        Axios.get(self.Config.ServerAddress + route, body)
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
   * @param {*} useAuth - defaulted to true, can override on request
   */
  post(VueStore, route, body, useAuth = true) {
    let self = this;
    return new Promise((resolve, reject) => {
      try {
        if (useAuth == true) {
          self.getAuthorization(VueStore)
            .then(token => {
              Axios.defaults.headers.common['Authorization'] = "bearer " + token;

              Axios.post(self.Config.ServerAddress + route, body)
                .then(r => {
                  delete Axios.defaults.headers.common["Authorization"];
                  resolve(r);
                })
                .catch(e => {
                  delete Axios.defaults.headers.common["Authorization"];
                  reject(e);
                })
            })
            .catch(e => {
              reject(e);
            })
        } else {
          Axios.post(self.Config.ServerAddress + route, body)
            .then(r => {
              resolve(r);
            })
            .catch(e => {
              reject(e);
            })
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * put
   * @param {*} route 
   * @param {*} body 
   * @param {*} useAuth - defaulted to true, can override on requese
   */
  put(VueStore, route, body, useAuth = true) {
    let self = this;

    return new Promise((resolve, reject) => {
      if (useAuth == true) {
        self.getAuthorization(VueStore)
          .then(token => {

            Axios.defaults.headers.common['Authorization'] = "bearer " + token;

            Axios.put(self.Config.ServerAddress + route, body)
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
        Axios.put(self.Config.ServerAddress + route, body)
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
  delete(VueStore, route, body, useAuth = true) {
    let self = this;

    return new Promise((resolve, reject) => {
      if (useAuth == true) {
        self.getAuthorization(VueStore)
          .then(token => {

            Axios.defaults.headers.common['Authorization'] = "bearer " + token;

            Axios.delete(self.Config.ServerAddress + route, body)
              .then(r => {
                delete Axios.defaults.headers.common["Authorization"];
                resolve(r);
              })
              .catch(e => {
                delete Axios.defaults.headers.common["Authorization"];
                reject(e);
              })
          })
          .catch(e => {
            reject(e);
          })
      } else {
        Axios.delete(self.Config.ServerAddress + route, body)
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
  getAuthorization(VueStore) {
    let self = this;

    //return localStorage.access_token;

    // let refreshToken = localStorage.refreshToken;

    return new Promise((resolve, reject) => {
      resolve(localStorage.access_token);
      // Axios.get(self.Config.ServerAddress + "Authentication/User/Refresh?strToken=" + refreshToken)
      //   .then(r => {
      //     VueStore.commit('setUserSessionData', r.data);
      //     localStorage.setItem('accessToken', r.data.AccessToken);
      //     localStorage.setItem('refreshToken', r.data.RefreshToken);
      //     resolve(r.data.AccessToken);
      //   })
      //   .catch(e => {
      //     VueStore.commit('setUserSessionData', null);
      //     localStorage.setItem('accessToken', null);
      //     localStorage.setItem('refreshToken', null);
      //     reject(e);
      //   });
    })
  }
}

export default {
  install(Vue, configData, store) {
    let caller = new AAxios(configData);

    Vue.prototype.get = (route, body, useAuth = true) => {
      return caller.get(store, route, body, useAuth);
    };

    Vue.prototype.post = (route, body, useAuth = true) => {
      return caller.post(store, route, body, useAuth);
    };

    Vue.prototype.put = (route, body, useAuth = true) => {
      return caller.put(store, route, body, useAuth);
    };

    Vue.prototype.delete = (route, body, useAuth = true) => {
      return caller.delete(store, route, body, useAuth);
    };

    Vue.prototype.refresh = () => {
      return caller.getAuthorization(store);
    };
  }
}