import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/products/Products.vue'
import NewProduct from '../views/products/newProduct.vue'
import EditProduct from '../views/products/EditProduct.vue'
import Signin from '../views/auth/Signin.vue'
import Signup from '../views/auth/Signup.vue'
import AdminPanel from '../views/admin/AdminPanel.vue'
import EditRol from '../views/admin/EditRol.vue'
import DeleteUser from '../views/admin/DeletUser.vue'
import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'
import store from '../store/index'

Vue.use(VueRouter)

//const token = store.state.token;
const rol = localStorage.getItem('rol')
let admin;
if (rol == "admin") {
  admin = true;
}
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

  {
    path: '/adminPanel',
    name: 'admin',
    meta: {
      admin: true
    },
    component: AdminPanel
  },

  {
    path: '/editRol',
    name: 'editRol',
    meta: {
      admin: true
    },
    component: EditRol
  },

  {
    path: '/deleteUser',
    name: 'deleteUser',
    meta: {
      admin: true
    },
    component: DeleteUser
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
  } else if (to.matched.some(route => route.meta.admin)) {
    if (!admin) {
      next('/')
    } else {
      next()
    }
  } else{ 
    next()
  }
  
})


export default router
