import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'

import Main from '../views/Main.vue'

import RolesAndPermissions from '../views/Main/Roles&Permissions'
import Users from '../views/Main/Users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
    children: [{
      path: 'RolePermissions',
      component: RolesAndPermissions
    }, {
      path: 'Users',
      component: Users
    }]
  },
]

const router = new VueRouter({
  routes
})

export default router
