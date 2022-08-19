import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const token = localStorage.getItem('token');
export default new Vuex.Store({
  state: {
    products: null,
    search: ""
  },
  getters: {
  },
  mutations: { 
    GETProducts(state, products) {
      state.products = products;
    },

    setUsername(state, search){
      state.search = search
    }
  },
  actions: {

    setUsernameAction({commit}, search){
      commit('setUsername', search)
    },

    async GETProductsAction(context){
      const products = await axios('https://company-api-v1.herokuapp.com/api/products', {
        headers: {
          "x-access-token":  token
        }
      })
      context.commit('GETProducts', products.data)
      return products.data
    },

    async newProduct(context, product) {
       axios.post('https://company-api-v1.herokuapp.com/api/products', product, {
        headers: {
          "x-access-token":  token
        }
       })
    },

    async EditProduct(context, product) {
      axios.put(`https://company-api-v1.herokuapp.com/api/products/${product.id}`, product, {
       headers: {
         "x-access-token":  token
       }
      })
   }
  },
  modules: {
  }
})
