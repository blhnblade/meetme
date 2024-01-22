import { createStore } from 'vuex'
import info from './info'
import  auth from './auth'
import services from './services'
import settings from './avatar'
import performers from './performers'

export default createStore({
  state: {

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    info, auth, services, settings, performers
  }
})
