/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)
import VueDraggableResizable from 'vue-draggable-resizable'
import service from '@/service/service';
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)
// import io from "socket.io-client";
// var socket = io.connect("http://localhost:3001");

import VueApexCharts from 'vue-apexcharts'
Vue.component('vue-apex-charts',VueApexCharts);
// axios
import axios from 'axios'
Vue.prototype.$http = axios
Vue.prototype.$service=service;
import fullscreen from 'vue-fullscreen';
Vue.use(fullscreen)
// Vue.prototype.socket=socket;
// Theme Configurations
import '../themeConfig.js'


// Algolia - Instant Search
import InstantSearch from 'vue-instantsearch';
Vue.use(InstantSearch);

//sweet alert

import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VueSweetalert2);

// Firebase
import '@/firebase/firebaseConfig'


// Auth0 Plugin
import AuthPlugin from "./plugins/auth";
Vue.use(AuthPlugin);


// ACL
import acl from './acl/acl'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css';


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// i18n
import i18n from './i18n/i18n'


// Vuesax Admin Filters
import './filters/filters'


// Clipboard
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);


// Tour
import VueTour from 'vue-tour'
Vue.use(VueTour)
require('vue-tour/dist/vue-tour.css')


// VeeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);


// // Google Maps
// import * as VueGoogleMaps from 'vue2-google-maps'
// Vue.use(VueGoogleMaps, {
//   load: {
//     // Add your API key here
//     key: 'API_KEY',
//     libraries: 'places', // This is required if you use the Auto complete plug-in
//   },
// })

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

//highchart
import HighchartsVue from 'highcharts-vue';
import { Chart } from 'highcharts-vue';

import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/dark-unica";
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';

highchartsMore(Highcharts);
solidGauge(Highcharts);
darkUnica(Highcharts);


Vue.component('chart', Chart)
Vue.use(HighchartsVue)
// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326',
})
import { IconStyle } from 'vuelayers'

Vue.use(IconStyle)
// Feather font icon
require('./assets/css/iconfont.css')


// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount('#app')
