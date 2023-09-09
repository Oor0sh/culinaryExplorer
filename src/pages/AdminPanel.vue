<template>
<div class="col-md-12">
    <div class="col-md-12" id="recipes">
        <h2 class="m-5">Welcome admin <strong>{{ activeUser }}</strong>!</h2>
        <div class="col-md-11 center">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <td>Recipe name</td>
                            <td>By</td>
                            <td>Cuisine Type</td>
                            <td>Diet Label</td>
                            <td>Health Labels</td>
                            <td>Ingredients</td>
                            <td>Image</td>
                            <td>Edit</td>
                            <td>Remove</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="recipe,key in recipes" :key="key">
                            <td>{{ recipe.recipe.label }}</td>
                            <td>{{ recipe.recipe.author }}</td>
                            <td>{{recipe.recipe.cuisineType ? recipe.recipe.cuisineType.slice(13) : recipe.recipe.cuisineType }}</td>
                            <td>{{recipe.recipe.dietLabels.slice(6)}}</td>
                            <td><p v-for="label, key in recipe.recipe.healthLabels.split('&health=')" :key="key">{{ label }}</p></td>
                            <td><p v-for="ingredient, key in recipe.recipe.ingredientLines" :key="key">{{ ingredient }}</p></td>
                            <td><img style="width: 100px" :src="recipe.recipe.image"></td>
                            <td><button :id="recipe.recipe.label" class="btn editBtn btn-warning">Edit</button></td>
                            <td><button :id="recipe.recipe.label" @click="deleteRecipe(recipe.recipe.label)" class="btn btn-danger">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
        </div>
        <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">{{ recipeToEdit.label }}</h5>
                        <button type="button" class="close" @click="closeModal()">
                          <span>&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div>
                            <h4>Recipe name:</h4>
                            <input id="editedName" type="text" :value="recipeToEdit.label">
                        </div>
                        <div class="m-3">
                              <h4>Ingredients:</h4>
                              <div class="col-md-12 d-flex flex-wrap">
                                <div class="col-md-12 m-1" v-for="ingredient, key in recipeToEdit.ingredientLines" :key="key">
                                    <input class="editedIngredients" type="text" :value="ingredient">
                                </div>
                              </div>
                        </div>
                        <div>
                            <h4>Diet type:</h4>
                            <select :value="recipeToEdit.dietLabels" id="editedDiet">
                                <option v-for="diet,key in this.$store.state.diets" :value="diet.value" :key="key">{{ diet.name }}</option>
                            </select>
                        </div>
                        <br/>
                        <div>
                        <h4>Cuisine:</h4>
                        <select :value="recipeToEdit.cuisineType" id="cuisine">
                            <option v-for="c, key in cuisines" :key="key" :value="c.value">{{ c.name }}</option>
                        </select>
                        </div>
                        <br/>
                        <div class="d-flex flex-wrap col-md-12">
                            <div class="center">
                                <h4>Health labels:</h4>
                                <div v-for="hl, key in healthLabels" :key="key">
                                <label class="m-2" :for="hl.name">{{ hl.name }}</label>
                                <input type="checkbox" name="hlCheckbox" :value="hl.value" >
                            </div>
                        </div>
                        </div>
                          <div v-if="recipeToEdit.preparation">
                              <h4>Preparation</h4>
                              <textarea :value="recipeToEdit.preparation" rows="5" id="editedPreparation"></textarea>
                          </div>
                          <br/>
                        <div>
                            <label><strong>Add image: </strong></label><input class="form-control" type="file" @change="uploadImage" accept="image/jpeg, image/png">
                        </div>
                        <br/>
                          <div>
                            <button @click="saveChanges(recipeToEdit.label)" :id="recipeToEdit.label" class="btn btn-warning">Save changes</button>
                          </div>

                        <div>
                            <b-modal v-model="modalShow">{{ message }}</b-modal>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
    </div>
</div>
</template>

<script>
export default {
    name: "AdminPanel",
    data() {
        return {
            recipeToEdit: Object,
            diets: this.$store.state.diets,
            editedDiet: '',
            editedName: '',
            editedImage: '',
            healthLabels: this.$store.state.healthLabels,
            cuisines: this.$store.state.cuisines,
            modalShow: false,
            message: ''
        }
    },
    computed: {
        activeUser() {
            return this.$store.state.activeUser.username
        },
        recipes() {
            return this.$store.state.userRecipes;
        },
    },
    methods: {
        deleteRecipe(recipeName) {
            let userRecipes = this.$store.state.userRecipes;
            let idToDelete = '';
            let i = 0;
            for (i; i < userRecipes.length; i++) {
                if (userRecipes[i].recipe.label == recipeName) {
                    idToDelete = i;
                }
            }
            userRecipes.splice(idToDelete, 1);
        },
        editRecipe(recipeName) {
            let userRecipes = this.$store.state.userRecipes;
            let idToEdit = '';
            let i = 0;
            for (i; i < userRecipes.length; i++) {
                if (userRecipes[i].recipe.label == recipeName) {
                    idToEdit = i;
                }
            }

            this.recipeToEdit = userRecipes[idToEdit].recipe;
            let modalElement = document.getElementById('exampleModal');
            modalElement.classList.add('show');
            modalElement.style.display = 'block';
            document.body.classList.add('modal-open');

        },
        closeModal() {
            let modalElement = document.getElementById('exampleModal');
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            document.body.classList.remove('modal-open');
        },
        saveChanges(id) {
            let editedName = document.getElementById("editedName").value;
            let editedIngredients = [];
            let editedDiet = document.getElementById("editedDiet").value;
            document.querySelectorAll(".editedIngredients").forEach(ingredient => {
                editedIngredients.push(ingredient.value);
            });

            let editedLabels = '';
            document.getElementsByName("hlCheckbox").forEach(cb => {
                if (cb.checked) {
                    editedLabels += cb.value;
                }
            })
            let cuisine = document.getElementById("cuisine").value;

            let toEdit = this.$store.state.userRecipes.find(x => x.recipe.label == id);

            toEdit.recipe.label = editedName;
            toEdit.recipe.ingredientLines = editedIngredients;
            toEdit.recipe.dietLabels = editedDiet;
            toEdit.recipe.cuisineType = cuisine;
            toEdit.recipe.image = this.editedImage ? this.editedImage : this.recipeToEdit.image;
            toEdit.recipe.healthLabels = editedLabels;
            this.$store.state.$forceChanges;

            this.modalShow = true;
            this.message = "Changes successfully saved!";
            this.closeModal();
            
        },
        uploadImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.editedImage = reader.result;
                }
                reader.readAsDataURL(file);
            }
        }
    },
    mounted() {
        let recipesDiv = document.getElementById('recipes');
        recipesDiv.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('editBtn')) {
                let recipe = target.id;
                    this.editRecipe(`${recipe}`);
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

        if (JSON.parse(localStorage.getItem("user")).role != "admin") {
            this.$router.push("/");
        }
    },
}
</script>

<style>
td{
    border: 1px solid black;
}
</style>