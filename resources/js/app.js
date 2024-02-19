require('./bootstrap');
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

window.Vue = require('vue');

Vue.component('home-component', require('./components/Home.vue').default);

const app = new Vue({
    el: '#app',
});
