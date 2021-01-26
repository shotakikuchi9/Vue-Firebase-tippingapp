import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login'
import Register from './components/Register'

Vue.use(Router);

export default new Router ({
  mode: 'history',
  routes: [
  {
    path: '/',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
  ]
})
			