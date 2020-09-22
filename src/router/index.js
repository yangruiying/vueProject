import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      redirect: '/comm-home',
      component: () => import(/* webpackChunkName: "login" */ '@/pages/home.vue'),
      children: [
        {
          path: '/comm-home',
          name: 'comm-home',
          component: () => import(/* webpackChunkName: "comm-home" */ '@/pages/comm-home/index.vue'),
          meta: {
            title: [
              {
                titleName: '关注',
                toPath: '/attention',
                name: 'attention'
              },
              {
                titleName: '首页',
                toPath: '/comm-home',
                name: 'comm-home'
              },
              {
                titleName: '同城',
                toPath: '/location',
                name: 'location'
              }
            ],
            headerHide: false,
            footerShow: true
          }
        },
        {
          path: '/attention',
          name: 'attention',
          component: () => import(/* webpackChunkName: "comm-home" */ '@/pages/attention/index.vue'),
          meta: {
            title: [
              {
                titleName: '关注',
                toPath: '/attention',
                name: 'attention'
              },
              {
                titleName: '首页',
                toPath: '/comm-home',
                name: 'comm-home'
              },
              {
                titleName: '同城',
                toPath: '/location',
                name: 'location'
              }
            ],
            headerHide: false,
            footerShow: true
          }
        },
        {
          path: '/location',
          name: 'location',
          component: () => import(/* webpackChunkName: "comm-home" */ '@/pages/location/index.vue'),
          meta: {
            title: [
              {
                titleName: '关注',
                toPath: '/attention',
                name: 'attention'
              },
              {
                titleName: '首页',
                toPath: '/comm-home',
                name: 'comm-home'
              },
              {
                titleName: '同城',
                toPath: '/location',
                name: 'location'
              }
            ],
            headerHide: false,
            footerShow: true
          }
        },
        {
          path: '/mine',
          name: 'mine',
          component: () => import(/* webpackChunkName: "comm-home" */ '@/pages/mine/index.vue'),
          meta: {
            title: [
              {
                titleName: '我的',
                toPath: '/mine'
              }
            ],
            headerHide: false,
            footerShow: true
          }
        },
        {
          path: '/classify',
          name: 'classify',
          component: () => import('@/pages/classify/index.vue'),
          meta: {
            title: [
              {
                titleName: '分类',
                toPath: '/classify'
              }
            ],
            headerHide: false,
            footerShow: true
          }
        },
        {
          path: '/message',
          name: 'message',
          component: () => import('@/pages/message/index.vue'),
          meta: {
            title: [
              {
                titleName: '消息',
                toPath: '/message'
              }
            ],
            headerHide: false,
            footerShow: true
          }
        },
        {
          path: '/publish',
          name: 'publish',
          component: () => import('@/pages/publish/index.vue'),
          meta: {
            title: [
              {
                titleName: '发布'
              }
            ],
            headerHide: true,
            footerShow: false
          }
        },
        {
          path: '/goodsDetail',
          name: 'goodsDetail',
          component: () => import('@/pages/goods-detail/index.vue'),
          meta: {
            title: [
              {
                titleName: '商品详情'
              }
            ],
            goBack: '/comm-home',
            headerHide: false,
            goBackShow: true
          }
        },
        {
          path: '/chat',
          name: 'chat',
          component: () => import('@/pages/chat/index.vue'),
          meta: {
            headerHide: true,
            footerShow: false
          }
        },
        {
          path: '/select-address',
          name: 'select-address',
          component: () => import('@/pages/select-address/index.vue'),
          meta: {
            title: [
              {
                titleName: '提交订单'
              }
            ],
            goBack: '/chat',
            headerHide: false,
            goBackShow: true
          }
        },
        {
          path: '/add-address',
          name: 'add-address',
          component: () => import('@/pages/add-address/index.vue'),
          meta: {
            title: [
              {
                titleName: '新增地址'
              }
            ],
            goBack: '/select-address',
            headerHide: false,
            goBackShow: true
          }
        },
        {
          path: '/mine-publish',
          name: 'mine-publish',
          component: () => import('@/pages/mine-publish/index.vue'),
          meta: {
            title: [
              {
                titleName: '我发布的'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false
          }
        },
        {
          path: '/mine-sell',
          name: 'mine-sell',
          component: () => import('@/pages/mine-sell/index.vue'),
          meta: {
            title: [
              {
                titleName: '我卖出的'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false
          }
        },
        {
          path: '/mine-buy',
          name: 'mine-buy',
          component: () => import('@/pages/mine-buy/index.vue'),
          meta: {
            title: [
              {
                titleName: '我买到的'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false
          }
        },
        {
          path: '/change-info',
          name: 'change-info',
          component: () => import('@/pages/change-info/index.vue'),
          meta: {
            title: [
              {
                titleName: '修改信息'
              }
            ],
            goBackShow: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/pages/login.vue')
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
