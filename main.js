import Vue from 'vue';
import App from './App';
import Fliter from 'ola-fliter';

Vue.prototype.$fliter = window.$fliter = Fliter;

const vm = new Vue({
    el:'#app',
    render:h=>h(App)
})