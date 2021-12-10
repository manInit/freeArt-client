import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Pages/Main'
import NewImagesList from '../components/UI/specificCardList/NewImagesList'
import NewAuctionsList from '../components/UI/specificCardList/NewAuctionsList'
import Image from '../components/Pages/Image'
import Auction from '../components/Pages/Auction'
import Clicker from '../components/Pages/Clicker'
import User from '../components/Pages/User'
import UserCollectionsList from '../components/UI/user/UserCollectionsList'
import UserAuctionList from '../components/UI/user/UserAuctionList'
import Login from '../components/Pages/Login'
import FormLogin from '../components/UI/forms/FormLogin'
import FormRegister from '../components/UI/forms/FormRegister'
import UploadImage from '../components/Pages/UploadImage'
import NotFound from '../components/Pages/NotFound'
import store from '../store'
import NewFollowingList from '../components/UI/specificCardList/NewFollowingList'
import UserAuctionParticipateList from '../components/UI/user/UserAuctionParticipateList'
import Moderation from '../components/Pages/Moderation'
import ModerationList from '../components/UI/specificCardList/ModerationList'
import TagsForm from '../components/UI/forms/TagsForm'
import UserModerationList from '../components/UI/specificCardList/UserModerationList'
import Docs from '../components/UI/Docs'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Main,
    children: [
      {
        path: '/',
        redirect: '/auctions'
      },
      {
        path: 'images',
        component: NewImagesList,
      },
      {
        path: 'auctions',
        component: NewAuctionsList,
      },
      {
        path: 'followers',
        component: NewFollowingList
      }
    ]
  },
  {
    path: '/image/:id',
    name: 'Image',
    component: Image
  },
  {
    path: '/auction/:id',
    name: 'Auction',
    component: Auction
  },
  {
    path: '/clicker',
    name: 'Clicker',
    component: Clicker,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    children: [
      {
        path: '',
        component: UserCollectionsList,
      },
      {
        path: '/user/:id/auctions',
        component: UserAuctionList,
      },
      {
        path: '/user/:id/auctions/participate',
        component: UserAuctionParticipateList
      },
      {
        path: '/user/:id/moderation',
        component: UserModerationList
      }
    ]
  },
  {
    path: '/moderation',
    component: Moderation,
    meta: { requiresAuth: true, requiresAdmin: true, },
    children: [
      {
        path: '',
        component: ModerationList
      },
      {
        path: 'tags',
        component: TagsForm
      },
      {
        path: 'docs',
        component: Docs
      }
    ]
  },
  {
    path: '/auth',
    name: 'Login',
    component: Login,
    meta: { noRequiresAuth: true },
    children: [
      {
        path: '',
        component: FormLogin
      },
      {
        path: 'register',
        component: FormRegister
      }
    ]
  },
  {
    path: '/upload',
    name: 'UploadImage',
    component: UploadImage,
    meta: { requiresAuth: true }
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (store.getters.roleUser !== 'ADMIN' || !store.getters.isAuth) {
        next({
          path: '/404'
        })
      }

      next()
    }

    if (!store.getters.isAuth) {
      next({
        path: '/404'
      })
    }
    next()
  }

  if (to.matched.some(record => record.meta.noRequiresAuth)) {
    if (store.getters.isAuth) {
      next({
        path: `/user/${store.getters.idUser}`
      })
    }
    next()
  }

  next()
})

export default router
