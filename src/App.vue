<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
      <router-link v-if="!auth" to="/signin">SignIn</router-link> 
      <router-link v-if="!auth" to="/signup">SignUp</router-link> 
      <router-link v-if="auth" to="/dashboard">Dashboard</router-link>
      </div>
    <div v-if="error" @click="clearError" class="error">{{ error }}</div>
    <router-view />
    <button v-if="auth" class="logout" @click="logout">Logout</button>  
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed:{
    ...mapState(["error"]),
    ...mapGetters({
      auth: "isAuthenticated"
    })
  },
  methods: {
    ...mapActions(["clearError", "logout"])
  }
}
</script>
<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width: 1024px;
    margin: 0 auto;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
    border-right: 1px solid;
    padding: 0 10px;
}

#nav a:last-child {
    border: none;
}

#nav a.router-link-exact-active {
    color: blueviolet;
}

.error {
    background-color: rgb(231, 165, 165);
    padding: 20px;
}

</style>

