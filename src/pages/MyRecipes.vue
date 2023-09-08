<template>
    <div class="d-flex justify-content-around mt-4">
        <div id="search" class="col-md-3 m-2 mb-5">

            <img width="100%" src="../assets/logo1.png" />
            <h4>Here you can see all recipes submited by you!</h4>
        </div>
        <div id="recipes" class="m-2">
            <div v-if="recipes != ''" class="d-flex flex-wrap justify-content-around mt-5">
                <div v-for="recipe, key in recipes" :key="key" class="card m-2" style="width: 12rem;">
                    <img class="card-img-top" :src="recipe.recipe.image" width="100%" :alt="recipe.recipe.label">
                    <div class="card-body">
                        <h5 class="card-title">{{ recipe.recipe.label }}</h5>
                    </div>
                    <div v-if="recipe._links"><button type="button" @click="showRecipe(recipe._links.self.href)"
                            class="btn btn-success mb-3 recipe col-md-8" data-toggle="modal" data-target="#exampleModal"
                            :data-id="recipe._links.self.href">See recipe</button></div>
                    <div v-else><button type="button" :id="recipe.recipe.label" @click="showUserRecipe(recipe.recipe.label)"
                            class="btn btn-success mb-3 recipe col-md-8" data-toggle="modal" data-target="#exampleModal">See
                            recipe</button></div>
                </div>
            </div>
            <div v-else class="d-flex flex-wrap justify-content-around mt-5">
                <h5>Looks like you haven't posted any recipes yet.</h5>
            </div>
        </div>

        <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
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
                        <p v-if="selectedRecipe.url">See more here: <a target="_blank"
                                :href="selectedRecipe.url">{{ selectedRecipe.url }}</a></p>
                        <h4 v-if="selectedRecipe.preparation">Instructions: </h4>
                        <p v-if="selectedRecipe.preparation">{{ selectedRecipe.preparation }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "MyRecipesPage",
    data() {
        return {
            recipes: '',
            selectedRecipe: Object,
        }
    },
    computed: {
        activeUser() {
            return this.$store.state.activeUser;
        }    
    },
    methods: {
        closeModal() {
            document.getElementById('exampleModal').classList.remove('show');
            document.body.classList.remove('modal-open');
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
        this.recipes = this.$store.state.userRecipes.filter(x => x.recipe.author == this.activeUser.username);
        let recipesDiv = document.getElementById('recipes');
        recipesDiv.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('recipe')) {
                if (target.getAttribute('data-id') != undefined) {
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
ul {
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
    outline-style: outset;
}

.criteria+label::before {
    color: white;
    /* Change the color of the checkmark */
    background-color: white;
}

.criteria:checked+label::before {
    color: white;
    background-color: white;
}</style>