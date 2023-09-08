<template>
    <nav class="navbar navbar-expand-lg bg-success p-3">
      <div class="mr-2"><img src="../assets/favicon.png" width="50px"/></div>
      <a class="navbar-brand"><router-link to="/"><strong>CulinaryExplorer</strong></router-link></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a v-for="navItem, key in navItems" :key="key" v-role="navItem.role" class="nav-item nav-link">
            <router-link :to="navItem.path">{{navItem.name}}</router-link>
          </a>
          <a href="" v-role="['user','admin']" @click="logout()" class="nav-item nav-link">Logout</a>
        </div>
      </div>
    </nav>
</template>


<script>
export default {
  name: "NavBar",
  props: ["navItems"],
  methods: {
    logout() {
      this.$store.commit("userChange", undefined)
      this.$forceUpdate()
      this.$router.push("/")
    }
  }
}
</script>


<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>