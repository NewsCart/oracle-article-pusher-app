import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import ArticlePusher from '../components/ArticlePusher.vue'
import NotFound from '../components/NotFound.vue'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/article-pusher',
      component: ArticlePusher
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/article-pusher') {
    store.state.user ? next() : next({ path: '/' })
    return
  }
  next()
})

export default router
