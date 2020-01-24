import JWT from 'jsonwebtoken';
import moment from 'moment'

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

class Common {
    constructor() {

    }

    FormatDate(date) {
        return moment(date).format('YYYY-MM-DD');
    }

    FormatTime(time) {
        return moment(time).format('HH:mm');
    }

    FormatDateTime(dateTime) {
        return moment(dateTime).format('YYYY-MM-DD HH:mm');
    }

    GetTokenData() {
        let accessToken = localStorage.accessToken;

        return JWT.decode(accessToken);
    }

    Guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return (
            s4() +
            s4() +
            "-" +
            s4() +
            "-" +
            s4() +
            "-" +
            s4() +
            "-" +
            s4() +
            s4() +
            s4()
        );
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
}

export default {
    install(Vue) {
        let handler = new Common();

        Vue.prototype.FormatDate = (date) => {
            return handler.FormatDate(date);
        };

        Vue.prototype.FormatTime = (time) => {
            return handler.FormatTime(time);
        };

        Vue.prototype.FormatDateTime = (dateTime) => {
            return handler.FormatDateTime(dateTime);
        };

        Vue.prototype.getSessionData = () => {
            return handler.GetTokenData();
        };

        Vue.prototype.guid = () => {
            return handler.Guid();
        };

        Vue.prototype.fetchLocal = (url) => {
            return handler.fetchLocal(url);
        };
    }
}