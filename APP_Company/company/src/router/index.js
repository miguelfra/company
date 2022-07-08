import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/404.vue'
import Products from '../views/products/Products.vue'
import NewProduct from '../views/products/newProduct.vue'
import EditProduct from '../views/products/EditProduct.vue'
import Signin from '../views/auth/Signin.vue'
import Signup from '../views/auth/Signup.vue'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const token = store.state.token;

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    meta: {notToken: true},
    component: Signin
  },

  {
    path: '/Signup',
    name: 'Signup',
    meta: {notToken: true},
    component: Signup
  }, 
  {
    path: '/products',
    name: 'Products',
    meta: {requiresToken: true},
    component: Products
  },
  {
    path: '/newProduct',
    name: 'newProduct',
    meta: {requiresToken: true},
    component: NewProduct
  },
  {
    path: '/editProduct/:id',
    name: 'EditProduct',
    meta: {requiresToken: true},
    component: EditProduct
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresToken)) {
    if (!localStorage.getItem('token')) {
      next('/')
    } else{
      next()
    }
  }else if (to.matched.some(route => route.meta.notToken)) {
    if (localStorage.getItem('token')) {
      next('/products')
    } else {
      next()
    }
  } else{ 
    next()
  }
  
})


export default router
