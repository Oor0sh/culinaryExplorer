<template>
    <div class="d-flex justify-content-around mt-4">
          <div id="search" class="col-md-3 m-2">

            <img width="100%" src="../assets/logo1.png"/>

            <div class="form-group d-flex flex-column">
              <div>
                <label class="p-2">Search:</label>
                <input type="text" id="searchKeyword" class="col-md-8" @keyup.enter="getRecipesFiltered()" v-model="searchKeyword">
                <br/>
                <p><em class="text-smaller text-muted"><small>i.e 'chicken'</small></em></p>
              </div>
              <div>
                <input type="button" class="btn btn-success col-md-8" @click="getRecipesFiltered()" value="Search"/>
              </div>
            </div>

            <div class="form-group m-3 mt-4">
                    <label class="p-2">Diet type:</label>
                    <select @change="getRecipesFiltered()" v-model="selectedDiet">
                      <option value=""></option>
                      <option v-for="diet, key in diets" :key="key" :value="diet.value">{{ diet.name }}</option>
                    </select>
              </div>
            <div class="form-group border border-success border-2 m-2 p-2">
                <div class="col-md-12"><h5 class="mt-2">Health label:</h5></div>
                <div class="col-md-12 d-flex flex-wrap">
                  <div v-for="label, key in healthLabels" :key="key" class="p-1">
                    <input @change="getRecipesFiltered()" v-model="selectedLabels" type="checkbox" :value="label.value" :id="label.name" class="m-2 criteria">
                    <label :for="label.name">{{ label.name }}</label>
                  </div>
                </div>
            </div>

            <div class="form-group border border-success border-2 m-2 p-2">
                  <div class="col-md-12"><h5 class="mt-2">Cuisine type:</h5></div>
                  <div class="col-md-12 d-flex flex-wrap">
                    <div v-for="cuisine, key in cuisines" :key="key" class="p-1">
                      <input @change="getRecipesFiltered()" v-model="selectedCuisines" type="checkbox" :value="cuisine.value" :id="cuisine.name" class="m-1 criteria">
                      <label :for="cuisine.name">{{ cuisine.name }}</label>
                    </div>
                  </div>
            </div>
          </div>
          <div id="recipes" class="m-2">
          <div v-if="noFilter" class="d-flex flex-wrap justify-content-around mt-5">
            <div class="col-md-12"><h1 class="mb-4">Featured</h1></div>
            <div v-for="(recipe, key) in featuredRecipes.recipes" :key="key" class="card m-2" style="width: 16rem;">
                <img class="card-img-top" :src="recipe.recipe.image" width="100%" :alt="recipe.recipe.label">
                  <div class="card-body">
                    <h5 class="card-title">{{recipe.recipe.label}}</h5>
                  </div>
                    <div><button type="button" @click="showRecipe(recipe._links.self.href)" class="btn btn-success mb-3 recipe col-md-8" data-toggle="modal" data-target="#exampleModal" :data-id="recipe._links.self.href">See recipe</button></div>
              </div>
              <div v-if="featuredRecipes.recipes.length == 0">
                  <h2>Getting featured recipes...</h2>
              </div>
          </div>

          <div v-else class="d-flex flex-wrap justify-content-around mt-5">
              <div v-for="recipe, key in filteredRecipes" :key="key" class="card m-2" style="width: 12rem;">
                  <img class="card-img-top" :src="recipe.recipe.image" width="100%" :alt="recipe.recipe.label">
                    <div class="card-body">
                      <h5 class="card-title">{{ recipe.recipe.label }}</h5>
                    </div>
                      <div v-if="recipe._links"><button type="button" @click="showRecipe(recipe._links.self.href)" class="btn btn-success mb-3 recipe col-md-8" data-toggle="modal" data-target="#exampleModal" :data-id="recipe._links.self.href">See recipe</button></div>
                      <div v-else><button type="button" :id="recipe.recipe.label" @click="showUserRecipe(recipe.recipe.label)" class="btn btn-success mb-3 recipe col-md-8" data-toggle="modal" data-target="#exampleModal">See recipe</button></div>
              </div>
              <div v-if="filteredRecipes.length == 0" class="center mt-5">
                <h2>There are no recipes for the entered criteria.</h2>
              </div>
              <!-- <div v-if="error==true && featuredRecipes.length==0" class="center mt-5">
                  <h2>There are no featured recepies available. Please try again later.</h2>
              </div> -->
                <!-- <div v-if="errorFilter" class="center mt-5">
                    <h2>Uh oh. Don't worry, it's not your fault. There is something wrong on our side.</h2>
                  </div> -->
            </div>
          </div>


           <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ selectedRecipe ? selectedRecipe.label : '' }}</h5>
                <button type="button" class="close" @click="closeModal">
                  <span>&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <h4>Ingredients:</h4>
                  <ol class="mt-2">
                      <li v-for="ingredients, key in selectedRecipe.ingredientLines" :key="key">{{ ingredients }}</li>
                  </ol>
                  <p v-if="selectedRecipe.url">See more here: <a target="_blank" :href="selectedRecipe.url">{{selectedRecipe.url}}</a></p>
                  <h4 v-if="selectedRecipe.preparation">Instructions: </h4>
                  <p v-if="selectedRecipe.preparation">{{ selectedRecipe.preparation }}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
</template>

<script>

import axios from 'axios';

export default {
    name: "RecipesPage",
    data() {
        return {
            selectedDiet: '',
            diets: this.$store.state.diets,
            healthLabels: this.$store.state.healthLabels,
            selectedLabels: [],
            selectedCuisines: [],
            cuisines: this.$store.state.cuisines,
            selectedRecipe: Object,
            filteredRecipes: [],
            searchKeyword: '',
            featuredRecipes: this.$store.state.dailyFeaturedRecipes,
            noFilter: true,
            // error: false,
            // errorFilter: false
        }
    },
    methods: {
      getRecipes() {
        let recipes = this.featuredRecipes.recipes;
        // let that = this;
        if (recipes.length == 0) {
              axios.get(this.$featuredRecipes).then(function (response) {
                let recipesFetched = response.data.hits;
                let toFeature = recipesFetched.slice(0, 8);
                toFeature.forEach(recipe => {
                  recipes.push(recipe);
                });
        }).catch(function () {
          // that.error = true;
        })
        }
        },
      getRecipesFiltered() {
        this.noFilter = false;

        // this.error = false;
        // this.errorFilter = false;
        let diet = this.selectedDiet ? this.selectedDiet : '';

        let keyword = this.searchKeyword ? "&q=" + this.searchKeyword.toLowerCase() : '';

        let labels = this.selectedLabels ? this.selectedLabels : '';
        let allSelectedLabels = '';
        labels.forEach(label => {
          allSelectedLabels += label;
        });

        let allSelectedCuisines = '';
        let selectedCuisines = this.selectedCuisines ? this.selectedCuisines : '';
        selectedCuisines.forEach(cuisine => {
          allSelectedCuisines += cuisine;
        });

        let that = this;
        let request = this.$baseAPIurl + keyword + diet + allSelectedLabels + allSelectedCuisines;
        if (request == this.$baseAPIurl) {
          that.noFilter = true;
        }
        else {
          let userRecipes = this.$store.state.userRecipes;
          let filteredUserRecipes = [];

          if (that.searchKeyword != '') {
            userRecipes.forEach(x => {
              if (x.recipe.label.toLowerCase().includes(that.searchKeyword.toLowerCase()))
                filteredUserRecipes.push(x);
            })
          }
          else {
            filteredUserRecipes = userRecipes
          }
          let dietFilter
          if (diet != '') {
            dietFilter = filteredUserRecipes.filter(x => x.recipe.dietLabels.includes(diet));
          }
          else {
            dietFilter = filteredUserRecipes
          }
          let cuisineFilter
          if (allSelectedCuisines != '') {
            cuisineFilter = dietFilter.filter(x => allSelectedCuisines.includes(x.recipe.cuisineType));
          }
          else {
            cuisineFilter = dietFilter
          }
          let healthFilter = []
          if (allSelectedLabels != '') {
            cuisineFilter.forEach(x => {
              let hls = [];
              x.recipe.healthLabels.split("&health=").forEach(l => {
                hls.push(l);
              })
              for (let i = 1; i <= hls.length; i++){
                if (allSelectedLabels.includes(hls[i])) {
                  healthFilter.push(x);
                }
              }
            });
          }
          else {
            healthFilter = cuisineFilter
          }
          axios.get(request).then(function (response) {
            healthFilter.forEach(recipe => {
            that.filteredRecipes.push(recipe);
          })
            let recipesFetched = response.data.hits;
            recipesFetched.forEach(recipe => {
              that.filteredRecipes.push(recipe);
            });

          }).catch(function () {
            // that.errorFilter = true;
          })
        }
      },
      closeModal() {
          document.getElementById('exampleModal').classList.remove('show');
          document.body.classList.remove('modal-open');
      },
      showRecipe(url) {
          let that = this;
          axios.get(url).then(function (response) {
              that.selectedRecipe = response.data.recipe;
              document.getElementById('exampleModal').classList.add('show');
              document.body.classList.add('modal-open');
          });
      },
      showUserRecipe(recipeName) {
        let userRecipes = this.$store.state.userRecipes;
        let recipe = userRecipes.find(x => x.recipe.label.toLowerCase().includes(recipeName.toLowerCase()));
        this.selectedRecipe = recipe.recipe;
        document.getElementById('exampleModal').classList.add('show');
        document.body.classList.add('modal-open');
      }
    },
  mounted() {
        this.getRecipes();
        let recipesDiv = document.getElementById('recipes');
        recipesDiv.addEventListener('click', event => {
            let target = event.target;
          if (target.classList.contains('recipe')) {
            if (target.getAttribute('data-id') != undefined){
                let recipe = target.getAttribute('data-id');
                this.showRecipe(`${recipe}`);
              }
            else {
              let recipe = target.id;
              this.showUserRecipe(`${recipe}`);
              }
            }
        });
        let closeButton = document.querySelector('#exampleModal .close');
        closeButton.addEventListener('click', () => {
            this.closeModal();
        });

        let modalBackdrop = document.querySelector('#exampleModal');
        modalBackdrop.addEventListener('click', (event) => {
            if (event.target === modalBackdrop) {
                this.closeModal();
            }
        });
    },
}
</script>

<style scoped>

ul{
    list-style: none;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
  display: none;
  opacity: 0;
  transition: opacity 0.15s linear;
  pointer-events: none;
}

/* Show the modal backdrop when the modal is shown */
.modal.show .modal-backdrop {
  display: block;
  opacity: 1;
}

/* Style the modal itself */
.modal {
  display: none;
  overflow: hidden;
  outline: 0;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Show the modal when its show class is added */
.modal.show {
  display: block;
}

.criteria {
  accent-color: rgb(255, 162, 0);
  color: white;
  background-color: white;
  outline: 2.5px solid green;
  outline-offset: -2px;
  outline-style:outset;
}

.criteria + label::before {
  color: white; /* Change the color of the checkmark */
  background-color: white;
}

.criteria:checked + label::before {
  color: white;
  background-color: white;
}
</style>