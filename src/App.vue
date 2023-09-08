<template>
  <div id="app">
    <Nav :nav-items="navigation"/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>

import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },
  data() {
    return {
      selectedRecipe: Object,
      isModalVisible: false,
      navigation: [
        {
          name: "Home",
          path: "/",
          role: ["admin", "guest", "user"]
        },
        {
          name: "Recipe Collection",
          path: "/collection",
          role: ["admin", "guest", "user"]
        },
        {
          name: "Post a recipe",
          path: "/newRecipe",
          role: ["admin", "user"]
        },
        {
          name: "My recipes",
          path: "/myRecipes",
          role: ["user","admin"]
        },
        {
          name: "Admin Panel",
          path: "/adminPanel",
          role: ["admin"]
        },
        {
          name: "Login",
          path: "/login",
          role: ["guest"]
        },
        {
          name: "Register",
          path: "/registration",
          role: ["guest"]
        }
      ]
    }
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  }
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Handlee&family=Oswald:wght@200;400&display=swap');
#app {
  font-family: 'Handlee', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: beige;
}

#app *{
  border-radius: 7px;
}

#app nav{
  border-radius: 0;
}

#app nav a{
  color: rgb(255, 162, 0);
  text-decoration: none;
}

#app footer{
  border-radius: 0px;
}

#app .card-img-top{
  border-radius: 7px 7px 0px 0px;
}

.fetchError{
  top: 50%;
  padding: 10px;
}

#app .center{
  margin: 0px auto;
  padding: 0px auto;
}

#app #loginBg{
  border-radius: 0px;
}

@import "~bootstrap-icons/font/bootstrap-icons.css";

</style>
