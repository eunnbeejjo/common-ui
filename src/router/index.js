import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from "../views/Dashboard";
import Login from "../views/login/Login";
import Join from "../views/join/Join";
import GeneralForum from "../views/generalForum/GeneralForum";
import CreatePost from "../views/generalForum/CreatePost";
import Post from "../views/generalForum/Post";
import UpdatePost from "../views/generalForum/UpdatePost";
import PostPw from "../views/generalForum/PostPw";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,

  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/join',
    name: 'join',
    component: Join
  },
  {
    path: '/general-forum',
    name: 'general-forum',
    component: GeneralForum
  },
  {
    path: '/create-post',
    name: 'create-post',
    component: CreatePost
  },
  {
    path: '/post',
    name: 'post',
    component: Post
  },
  {
    path: '/update-post',
    name: 'update-post',
    component: UpdatePost
  },
  {
    path: '/post-pw',
    name: 'post-pw',
    component: PostPw
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
