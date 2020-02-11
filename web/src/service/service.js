// import Api from '@/service/api'
import axios from 'axios'
// import { read } from 'fs';
// import Axios from 'axios';
import Vue from 'vue';
// import moment from "moment";
// var url;
export default {
  prefix_token: "DTC@software.com.eyhkdjfhdkjf.xyz",
  socket_host: window.socket_host,
  // url:"http://localhost:3000/api/",
  center:[ 100.61506779999999, 13.7531888 ],
  url: window.url,
  getData(url) {
    return new Promise((resolve, reject) => {
      axios.create({
        baseURL: this.url,
        withCredentials: false,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.getToken()
        }
      }).get(url).then(result => {

        result = result.data;
        if (result.code == true) {
          resolve(result);
        } else {
          reject(result);
        }
      }, err => {
        reject(err);
      });
    })
  },
  setProfilePicture(img) {
    localStorage.setItem('img', img);
  },
  getProfiePicture() {
    if (localStorage.get('img') != undefined) {
      return localStorage.get('img');
    } else {
      return "";
    }
  },
  postData(url, data) {
    return new Promise((resolve, reject) => {
      axios.create({
        baseURL: this.url,
        withCredentials: false,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.getToken()
        }
      }).post(url, JSON.stringify(data)).then(result => {
        result = result.data;
        resolve(result);
      }, err => {
        reject(err);
      });
    })
  },
  prefix: "xsdfjksldfjlsdfkjsldfkj",
  tokenText: "getmytoken",
  setToken(token) {
    sessionStorage.setItem(this.tokenText, this.prefix + token);
  },
  getToken() {
    var token = sessionStorage.getItem(this.tokenText);
    if (token) {
      return token.substr(this.prefix.length);
    } else {
      return "";
    }

  },
  removeToken() {
    sessionStorage.removeItem(this.tokenText);
  },
  getUser() {
    return this.decodeToken(this.getToken());
  },
  isLoggedIn() {

    return (this.checkLogin(this.prefix + this.getToken()))


  },
  checkLogin(token) {

    if (this.decodeToken(token.substr(this.prefix.length))) {
      return true;
    }
    return false;
  },


  decodeToken(token) {
    if (token.length < this.prefix_token.length) {
      return "";
    } else {
      token = token.substr(this.prefix_token.length);
    }
    try {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      return "";
    }
  }

}
