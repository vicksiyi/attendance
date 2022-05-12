import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import("@/views/home")
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("@/views/login")
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import("@/views/register")
    },
    {
      path: '/*',
      name: 'NotFound',
      component: () => import("@/views/services/notFound")
    }
  ]
})
