import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router';

import Home from './pages/Home.vue';
import Library from './pages/Recipes.vue';
import CreateRecipe from './pages/PostRecipePage.vue';
import Login from './pages/Login.vue';
import Registration from './pages/Registration.vue';
import AdminPanel from './pages/AdminPanel.vue';
import MyRecipesPage from './pages/MyRecipes.vue'

import store from './store.js';
import roleDirectives from './roleDirectives'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.directive("role", roleDirectives);



Vue.config.productionTip = false


Vue.prototype.$baseAPIurl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=85b9b4e1&app_key=b56773e13c9d7f2b1f02bac36c268c04';
Vue.prototype.$featuredRecipes = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=85b9b4e1&app_key=b56773e13c9d7f2b1f02bac36c268c04&imageSize=THUMBNAIL&random=true';

const routes = [
  { path: '/', component: Home },
  { path: '/collection', component: Library },
  { path: '/newRecipe', component: CreateRecipe },
  { path: '/login', component: Login },
  { path: '/registration', component: Registration },
  { path: '/adminPanel', component: AdminPanel },
  { path: '/myRecipes', component: MyRecipesPage}
];

const router = new VueRouter({
  routes
});

export default router;

Vue.use(VueRouter);

new Vue({
  store,
  router,
  created: function() {
    var user = localStorage.getItem("user")

    if(!user) {
      this.$store.commit("userChange", undefined)
      return
    }
    
    this.$store.commit("userChange", JSON.parse(user))
  },
  render: h => h(App),
}).$mount('#app')
