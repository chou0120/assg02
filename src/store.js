import Vue from 'vue'
import Vuex from 'vuex'
import axiosAuth from './axios-auth'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    UID: null,
    error: ''
  },
  // State close
  mutations: {
    // authorize the user using the UID and TOKEN from Firebase
    AUTH_USER (state, formData) {
      state.idToken = formData.token
      state.UID = formData.UID
    },
    // show error to the user
    SET_ERROR (state, error) {
      state.error = error
    },
    // get rid of the error when user click on the error dialogue box
    EMPTY_ERROR (state) {
      state.error = ''
    },
    // clear data when the user logout
    CLEAR_DATA (state) {
      state.idToken = null
      state.UID = null
    }
  },
  // mutation close
  actions: {
    signUp ({commit}, formData) {
      axiosAuth.post('accounts:signUp?key=AIzaSyDWEagUk2LvPcs182Pl_EldQ3qZQ0VKQOo', {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          // save the authorization infor in the state
          commit('AUTH_USER', {
            token: res.data.idToken,
            UID: res.data.localId
          })
          router.push({ name: 'dashboard' })
        })
        .catch(error => {
          if (error.response) {
            // console.log(error.response.data.error.message)

            commit('SET_ERROR',
              error.response.data.error.message)
          }
        })
    }, // Closing SignUp
    signIn ({ commit }, formData) {
      axiosAuth.post('accounts:signInWithPassword?key=AIzaSyDWEagUk2LvPcs182Pl_EldQ3qZQ0VKQOo', {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          // save the authorization infor in the state
          commit('AUTH_USER', {
            token: res.data.idToken,
            UID: res.data.localId
          })
          router.push({ name: 'dashboard' })
        })
        .catch(error => {
          if (error.response) {
          // console.log(error.response.data.error.message)

            commit('SET_ERROR',
              error.response.data.error.message)
          }
        })
    },
    clearError ({commit}) {
      commit('EMPTY_ERROR')
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('UID')

      // commit mutation to clear the page

      commit('CLEAR_DATA')

      // send the user to signin page
      router.push({name: 'signin'})
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
  // action close
})

// AIzaSyDWEagUk2LvPcs182Pl_EldQ3qZQ0VKQOo
