export default [
  {
    path: '/meetingEnd',
    name: 'meetingEnd',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/components/About.vue')
  }
]
