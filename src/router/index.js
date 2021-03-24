import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import routes from '@/router/routes'
// import { store } from '@/store'
// import { checkIfTokenNeedsRefresh } from '@/utils/utils.js'
// import { checkForUpdates } from '@/utils/updates.js'
// import * as types from '@/store/mutation-types'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...routes]
})

router.beforeEach((to, from, next) => {
  return next()
})

export default router
