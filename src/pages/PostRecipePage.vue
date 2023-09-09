<template>
<div class="d-flex flex-wrap p-3">
    <div class="col-md-7 d-flex flex-wrap justify-content-between p-2">
        
        <form id="recipeForm" class="col-md-12 border border-success">

        <div class="form-group col-md-12 m-2">
            <div class="col-md-12">
                <label for="author" class="col-md-12"><strong>By: </strong></label>
                <input type="text" class="col-md-4 text-center p-2" disabled id="author" v-model="activeUser">
            </div>
        </div>


        <div class="form-group col-md-12 m-2">
            <div class="col-md-12">
                <label for="recipeName" class="col-md-12"><strong>Recipe name: </strong></label>
                <input class="col-md-5 text-center" v-model="recipeName" type="text" id="recipeName">
            </div>
        </div>


        <div class="form-group col-md-12 m-2">
            <div class="col-md-12">
                <label class="col-md-12" for="ingredients"><strong>Ingredients:</strong></label>
            </div>

            <div class="col-md-12" id="ingredients">
                <div class="col-md-12">
                    <input type="text" class="ingredient text-center">
                </div>
            </div>

            <div class="form-group center col-md-12 p-2">
                <button @click="addIngredient()">Add ingredient</button>
            </div>
        </div>

        <div class="form-group col-md-11 center pb-3 mt-2">
            <div class="col-md-12 p-3">
                <label for="diet"><strong>Diet type: </strong></label>
                <select v-model="selectedDiet" id="diet" class="col-md-11">
                    <option value=""></option>
                    <option v-for="type, key in dietTypes" :key="key" :value="type.value">{{ type.name }}</option>
                </select>
            </div>
        </div>

        <div class="form-group col-md-11 center mb-4 pb-3">
                <div class="col-md-12 p-3">
                    <label for="cuisine"><strong>Cuisine: </strong></label>
                    <select v-model="cuisineType" id="cuisine" class="col-md-11">
                        <option value=""></option>
                        <option v-for="c, key in cuisines" :key="key" :value="c.value">{{ c.name }}</option>
                    </select>
                </div>
        </div>

        <div class="form-group col-md-11 center border border-success">
                <label for="diet" class="mt-3"><strong>Health labels: </strong></label>
                <div class="col-md-12 p-3 d-flex flex-wrap justify-content-around">
                    <div v-for="hl,key in healthLabels" :key="key">
                        <label :for="hl.name">{{ hl.name }}</label>
                        <input type="checkbox" name="hlCheckbox" :value="hl.value" >
                    </div>
                </div>
        </div>

        <br/>

        <div class="form-group col-md-11 center">
            <div>
                <label for="prepProcess"><strong>Preparation process:</strong></label>
            </div>
            <div>
                <textarea v-model="preparation" id="prepProcess" rows="5"></textarea>
            </div>
        </div>

        <div class="form-group col-md-12">
            <div class="col-md-12 p-3">
                    <label><strong>Add image: </strong></label><input class="form-control" type="file" @change="uploadImage" accept="image/jpeg, image/png">
            </div>
        </div>

        </form>
    </div>

    <div>
        <b-modal v-model="modalShow">{{ message }}</b-modal>
    </div>

    <div class="col-md-5" id="recipePreview">
        <div class="center sticky-top col-md-8" style="height:500px;" id="recipeBox">
            <div class="center mt-4 recipePictureClass" v-if="!recipeImage" id="recipePicture">
            </div>
            <div class="center mt-4 recipePictureClass" v-else>
                <img :src="recipeImage" style="width: 100%; height: 100%">
            </div>
            <div class="mt-4">
                <p><strong>Recipe name:</strong> {{recipeName}}</p>
                <p><strong>By:</strong> {{ activeUser }}</p>
            </div>
            <div class="mt-5">
                <button @click="saveRecipe()" class="p-2 btn btn-success col-md-4"><strong>Post recipe</strong></button>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import defaultImage from '../assets/default-product-image.png';
export default{
    name: 'CreateRecipes',
    data() {
        return {
            defaultImage: this.defaultImage,
            recipeName: '',
            recipeImage: null,
            preparation: '',
            dietTypes: this.$store.state.diets,
            healthLabels: this.$store.state.healthLabels,
            ingredientsList: [],
            selectedHealthLabels: '',
            selectedDiet: '',
            cuisineType: '',
            cuisines: this.$store.state.cuisines,
            modalShow: false,
            message: ''
        }
    },
    computed: {
        activeUser() {
            return this.$store.state.activeUser ? this.$store.state.activeUser.username : ''
        }
    },
    methods: {
        addIngredient() {
            let ingredients = document.getElementById("ingredients");
            let newIngredientDiv = document.createElement("div");
            let newIngredient = document.createElement("input");
            let removeIngredient = document.createElement("button");

            newIngredient.type = 'text';
            newIngredient.classList.add('m-1');
            newIngredient.classList.add('col-md-3');
            newIngredient.classList.add('text-center');
            newIngredient.classList.add('ingredient');

            removeIngredient.innerHTML = '✗';
            removeIngredient.classList.add("removeBtn");

            newIngredientDiv.classList.add("col-md-12");
            newIngredientDiv.classList.add("center");


            newIngredientDiv.append(newIngredient);
            newIngredientDiv.append(removeIngredient);
            ingredients.append(newIngredientDiv);
        },
        saveRecipe() {
            let ingredients = document.querySelectorAll('.ingredient');
            ingredients.forEach(ingredient => {
                if (ingredient.value != '') {
                    this.ingredientsList.push(ingredient.value)
                }
            });
            let healthLabels = document.getElementsByName("hlCheckbox");
            healthLabels.forEach(label => {
                if (label.checked) {
                    this.selectedHealthLabels += label.value;
                }
            })
            let recipeImage = this.recipeImage ? this.recipeImage : defaultImage;
            let recipeName = this.recipeName;
            let author = this.activeUser;
            let preparation = this.preparation;

            let newRecipe = {
                recipe: {
                    label: recipeName,
                    preparation: preparation,
                    author: author,
                    image: recipeImage,
                    ingredientLines: this.ingredientsList,
                    healthLabels: this.selectedHealthLabels,
                    dietLabels: this.selectedDiet,
                    cuisineType: this.cuisineType
                }
            }

            if (newRecipe.recipe.label == '') {
                this.modalShow = true;
                this.message = "Please enter a name for your recipe.";
            }

            if (newRecipe.recipe.ingredientLines.length == 0) {
                this.modalShow = true;
                this.message = "Please add at least one ingredient.";
            }

            if (this.$store.dispatch('saveRecipe', newRecipe)) {
                this.modalShow = true;
                this.message = "Recipe successfully posted!";
            }

            
        },
        removeIngredient(event) {
            if (event.target.classList.contains('removeBtn')) {
                let parent = event.target.parentElement.parentElement;
                let child = event.target.parentElement;
                parent.removeChild(child);
            }

        },
        uploadImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.recipeImage = reader.result;
                }
                reader.readAsDataURL(file);
            }
        }
    },
    mounted() {
        let ingredients = document.getElementById('ingredients');
        ingredients.addEventListener('click', this.removeIngredient);
    },
}
</script>

<style scoped>

#prepProcess{
    width: 100%;
}
label{
    margin: 5px;
}

#recipeBox{
    background-color: white;
    border: 3px solid black;
}

#recipePicture{
    width: 80%;
    height: 70%;
    background: url('../assets/default-product-image.png');
    background-size: contain;
    border: 2px solid black;
}
.recipePictureClass{
    width: 80%;
    height: 70%;
    background-size: contain;
    border: 2px solid black;
}
</style>