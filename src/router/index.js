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
              // {
              //   titleName: '关注',
              //   toPath: '/attention',
              //   name: 'attention'
              // },
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
              // {
              //   titleName: '关注',
              //   toPath: '/attention',
              //   name: 'attention'
              // },
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
              // {
              //   titleName: '关注',
              //   toPath: '/attention',
              //   name: 'attention'
              // },
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
            headerHide: true,
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
            headerHide: true,
            footerShow: true
          }
        },
        ,
        {
          path: '/classifyList',
          name: 'classifyList',
          component: () => import('@/pages/classify/list.vue'),
          meta: {
            title: [
              {
                titleName: '分类',
                toPath: '/classify'
              }
            ],
            headerHide: true,
            footerShow: false
          }
        },
        {
          path: '/classifySearch',
          name: 'classifySearch',
          component: () => import('@/pages/classify/carSearch.vue'),
          meta: {
            title: [
              {
                titleName: '分类',
                toPath: '/classify'
              }
            ],
            headerHide: true,
            footerShow: false
          }
        },
        {
          path: '/compute',
          name: 'compute',
          component: () => import('@/pages/classify/compute.vue'),
          meta: {
            title: [
              {
                titleName: '分类',
                toPath: '/classify'
              }
            ],
            headerHide: true,
            footerShow: false
          }
        },
        {
          path: '/carDetail',
          name: 'carDetail',
          component: () => import('@/pages/classify/carDetail.vue'),
          meta: {
            title: [
              {
                titleName: '分类',
                toPath: '/classify'
              }
            ],
            headerHide: true,
            footerShow: false
          }
        },
        {
          path: '/topList',
          name: 'topList',
          component: () => import('@/pages/topic/index.vue'),
          meta: {
            title: [
              {
                titleName: '分类',
                toPath: '/classify'
              }
            ],
            headerHide: false,
            footerShow: false
          }
        },
        {
          path: '/topicAdd',
          name: 'topicAdd',
          component: () => import('@/pages/topic/topicAdd.vue'),
          meta: {
            title: [
              {
                titleName: '分类',
                toPath: '/classify'
              }
            ],
            headerHide: true,
            footerShow: false
          }
        },
        {
          path: '/topicDetail',
          name: 'topicDetail',
          component: () => import('@/pages/topic/topicDetail.vue'),
          meta: {
            title: [
              {
                titleName: '帖子详情',
                toPath: '/classify'
              }
            ],
            headerHide: false,
            footerShow: false
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
          path: '/firstSort',
          name: 'firstSort',
          component: () => import('@/pages/goods-detail/firstSort.vue'),
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
          path: '/carList',
          name: 'carList',
          component: () => import('@/pages/goods-detail/carList.vue'),
          meta: {
            title: [
              {
                titleName: '商品详情'
              }
            ],
            goBack: '/comm-home',
            headerHide: true,
            goBackShow: true
          }
        },
        {
          path: '/secondCarList',
          name: 'secondCarList',
          component: () => import('@/pages/goods-detail/secondCarList.vue'),
          meta: {
            title: [
              {
                titleName: '商品详情'
              }
            ],
            goBack: '/comm-home',
            headerHide: true,
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
        },
        {
          path: '/ship-goods',
          name: 'ship-goods',
          component: () => import('@/pages/ship-goods/index.vue'),
          meta: {
            goBackShow: true
          }
        },
        {
          path: '/order-detail',
          name: 'order-detail',
          component: () => import('@/pages/order-detail/index.vue'),
          meta: {
            goBackShow: true
          }
        },
        {
          path: '/home-page',
          name: 'home-page',
          component: () => import('@/pages/home-page/index.vue'),
          meta: {
            title:[
              {
                titleName: '个人主页'
              }
            ],
            goBackShow: true
          }
        },
        {
          path:'/goods-edit',
          name: 'goods-edit',
          component: () => import('@/pages/goods-edit/index.vue'),
          meta:{
            headerHide: true,
            footerShow: false
          }
        },
        {
          path:'/goods-evaluation',
          name: 'goods-evaluation',
          component: () => import('@/pages/goods-evaluation/index.vue'),
          meta:{
            
            headerHide: true,
            footerShow: false
          }
        },
        {
          path:'/fan',
          name: 'fan',
          component: () => import('@/pages/mine/fan.vue'),
          meta:{
            title:[
              {
                titleName: '粉丝列表'
              }
            ],
            headerHide: false,
            footerShow: false,
            goBackShow: true
          }
        },
        {
          path:'/atten',
          name: 'atten',
          component: () => import('@/pages/mine/atten.vue'),
          meta:{
            title:[
              {
                titleName: '关注列表'
              }
            ],
            headerHide: false,
            footerShow: false,
            goBackShow: true
          }
        },
        {
          path:'/collection',
          name: 'collection',
          component: () => import('@/pages/mine/collection.vue'),
          meta:{
            title:[
              {
                titleName: '收藏列表'
              }
            ],
            headerHide: false,
            footerShow: false,
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
    },
    {
      path:'/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "login" */ '@/pages/register.vue')
    }
  ]
})
