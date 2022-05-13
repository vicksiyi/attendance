import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import("@/views/home"),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import("@/components/Home"),
        },
        {
          path: '/class',
          name: 'ClassDetail',
          component: () => import("@/components/ClassDetail"),
        },
        {
          path: '/course',
          name: 'Course',
          component: () => import("@/components/Course"),
        },
        {
          path: '/view/student',
          name: 'ViewStudent',
          component: () => import("@/components/ViewStudent"),
        },
        {
          path: '/view/course',
          name: 'ViewCourse',
          component: () => import("@/components/ViewCourse"),
        }
      ]
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
