import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

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
  },
  {
    path: '/dashboard',
    component: Dashboard
  }
  ]
})
			