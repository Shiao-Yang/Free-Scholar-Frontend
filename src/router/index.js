import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Collection from "@/views/Collection";
import CollectionCover from "@/views/CollectionCover";
import Settings from "@/views/Settings";
import Home from "@/views/FollowList"
import followerList from "@/views/Home";
import followList from "@/views/FollowList";
import messageManage from "@/views/MessageManage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Settings
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/Collection',
    name: 'Collection',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Collection.vue')
  },
  {
    path: '/CollectionCover',
    name: 'CollectionCover',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CollectionCover.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue')
  },
  {

    path: '/ScholarsPortal',
    name: 'ScholarsPortal',
    component: () => import('../views/ScholarsPortal.vue')
  },
  {
    path: '/searchList',
    name: 'searchList',
    component: () => import('../views/SearchList.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/followList',
    name: 'followList',
    component: () => import('../views/FollowList.vue')
  },
  {
    path: '/followerList',
    name: 'followerList',
    component: () => import('../views/FollowerList.vue')
  },
  {
    path: '/adminHome',
    name: 'adminHome',
    component: () => import('../views/AdminHome.vue')
  },
  {
    path: '/LiteratureManage',
    name: 'LiteratureManage',
    component: () => import('../views/LiteratureManage.vue')
  },
  {
    path: '/Institutional',
    name: 'Institutional',
    component: () => import('../views/Institutional.vue')
  },
  {
    path: '/adminUser',
    name: 'adminUser',
    component: () => import('../views/AdminUser.vue')
  },
  {
    path: '/MessageManage',
    name: 'MessageManage',
    component: () => import('../views/MessageManage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
