import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import defaultImage from '@/assets/default-product-image.png';

const store = new Vuex.Store({
    state: {
        activeUser: {username: "guest", role: "guest"},
        users: [
            {
                id: 1, name: 'User1', username: 'User1', email: 'user1@gmail.com', password: 'user1', role: 'user'
            },
            {
                id: 2, name: 'User2', username: 'User2', email: 'user2@gmail.com', password: 'user2', role: 'admin'
            },
        ],
        userRecipes: [
            {
                recipe: {
                    cuisineType: '&cuisineType=American',
                    author: "User1",
                    dietLabels: '&diet=balanced',
                    healthLabels: '&health=vegan',
                    image: defaultImage,
                    ingredientLines: ['1 tablespoon salt','1l water'],
                    label: 'Test Recipe 1',
                }
            },
            {
                recipe: {
                    cuisineType: '&cuisineType=Chinese',
                    author: "User1",
                    dietLabels: '&diet=high-fiber',
                    healthLabels: '&health=dairy-free&health=fish-free',
                    image: defaultImage,
                    ingredientLines: ['1 tablespoon salt','1l water'],
                    label: 'Test Recipe 2',
                }
            },
            {
                recipe: {
                    cuisineType: '&cuisineType=Chinese',
                    author: "User1",
                    dietLabels: '&diet=balanced',
                    healthLabels: '&health=vegan',
                    image: defaultImage,
                    ingredientLines: ['1 tablespoon salt','1l water'],
                    label: 'Test Recipe 3',
                }
            }
        ],
        dailyFeaturedRecipes: {
            recipes: []
        },
        diets: [
                {
                    name: 'Balanced',
                    value: '&diet=balanced'
                },
                {
                    name: 'High fiber',
                    value: '&diet=high-fiber'
                },
                {
                    name: 'High protein',
                    value: '&diet=high-protein'
                },
                {
                    name: 'Low carb',
                    value: '&diet=low-carb'
                },
                {
                    name: 'Low fat',
                    value: '&diet=low-fat'
                },
                {
                    name: 'Low sodium',
                    value: '&diet=low-sodium'
                }
        ],
        healthLabels: [
                {
                    name: 'Alcohol - Cocktail',
                    value: '&health=alcohol-cocktail'
                },
                {
                    name: 'Alcohol free',
                    value: '&health=alcohol-free'
                },
                {
                    name: 'Celery free',
                    value: '&health=celery-free'
                },
                {
                    name: 'Crustacean free',
                    value: '&health=crustacean-free'
                },
                {
                    name: 'Dairy free',
                    value: '&health=dairy-free'
                },
                {
                    name: 'Egg free',
                    value: '&health=egg-free'
                },
                {
                    name: 'Fish free',
                    value: '&health=fish-free'
                },
                {
                    name: 'Fodmap free',
                    value: '&health=fodmap-free'
                },
                {
                    name: 'Gluten free',
                    value: '&health=gluten-free'
                },
                {
                    name: 'Immuno supportive',
                    value: '&health=immuno-supportive'
                },
                {
                    name: 'Keto friendly',
                    value: '&health=keto-friendly'
                },
                {
                    name: 'Kidney friendly',
                    value: '&health=kidney-friendly'
                },
                {
                    name: 'Kosher',
                    value: '&health=kosher'
                },
                {
                    name: 'Low fat abs',
                    value: '&healt=low-fat-abs'
                },
                {
                    name: 'Low potassium',
                    value: '&health=low-potassium'
                },
                {
                    name: 'Low sugar',
                    value: '&health=low-sugar'
                },
                {
                    name: 'Lupine free',
                    value: '&health=lupine-free'
                },
                {
                    name: 'Mediterranean',
                    value: '&health=Mediterranean'
                },
                {
                    name: 'Molusk free',
                    value: '&health=molusk-free'
                },
                {
                    name: 'Mustard free',
                    value: '&health=mustard-free'
                },
                {
                    name: 'No oil added',
                    value: '&health=no-oil-added'
                },
                {
                    name: 'Paleo',
                    value: '&health=paleo'
                },
                {
                    name: 'Peanut free',
                    value: '&health=peanut-free'
                },
                {
                    name: 'Pescatarian',
                    value: '&health=pescatarian'
                },
                {
                    name: 'Pork free',
                    value: '&health=pork-free'
                },
                {
                    name: 'Red meat free',
                    value: '&health=red-meat-free'
                },
                {
                    name: 'Sesame free',
                    value: '&health=sesame-free'
                },
                {
                    name: 'Shellfish free',
                    value: '&health=shellfish-free'
                },
                {
                    name: 'Soy free',
                    value: '&health=soy-free'
                },
                {
                    name: 'Sugar conscious',
                    value: '&health=sugar-conscious'
                },
                {
                    name: 'Sulfite free',
                    value: '&health=sulfite-free'
                },
                {
                    name: 'Tree nut free',
                    value: '&health=tree-nut-free'
                },
                {
                    name: 'Vegan',
                    value: '&health=vegan'
                },
                {
                    name: 'Vegetarian',
                    value: '&health=vegetarian'
                },
                {
                    name: 'Wheat free',
                    value: '&health=wheat-free'
                }
        ],
        cuisines: [
                {
                    name: 'American',
                    value: '&cuisineType=American'
                },
                {
                    name: 'Asian',
                    value: '&cuisineType=Asian'
                },
                {
                    name: 'British',
                    value: '&cuisineType=British'
                },
                {
                    name: 'Caribbean',
                    value: '&cuisineType=Caribbean'
                },
                {
                    name: 'Central Europe',
                    value: '&cuisineType=Central%20Europe'
                },
                {
                    name: 'Chinese',
                    value: '&cuisineType=Chinese'
                },
                {
                    name: 'Eastern Europe',
                    value: '&cuisineType=Eastern%20Europe'
                },
                {
                    name: 'French',
                    value: '&cuisineType=French'
                },
                {
                    name: 'Indian',
                    value: '&cuisineType=Indian'
                },
                {
                    name: 'Italian',
                    value: '&cuisineType=Italian'
                },
                {
                    name: 'Japanese',
                    value: '&cuisineType=Japanese'
                },
                {
                    name: 'Kosher',
                    value: '&cuisineType=Kosher'
                },
                {
                    name: 'Mediterranean',
                    value: '&cuisineType=Mediterranean'
                },
                {
                    name: 'Mexican',
                    value: '&cuisineType=Mexican'
                },
                {
                    name: 'Middle Eastern',
                    value: '&cuisineType=Middle%20Eastern'
                },
                {
                    name: 'Nordic',
                    value: '&cuisineType=Nordic'
                },
                {
                    name: 'South American',
                    value: '&cuisineType=South%20American'
                },
                {
                    name: 'South East Asian',
                    value: '&cuisineType=South%20East%20Asian'
                }
        ],
    },
    getters: {
        username(state){
            return state.activeUser.username;
        },
        role(state) {
            return state.activeUser.role;
        }
    },
    actions: {
        async saveRecipe({commit},recipe) {
            commit("addRecipe", recipe)
        }
    },
    mutations: {
        addRecipe(state, recipe) {
            if (state.userRecipes.push(recipe)) {
                return 1;
            }
        },
        userChange(state, newUser) {

            if(!newUser) {
                state.activeUser.username = "guest"
                state.activeUser.role = "guest"
                localStorage.removeItem("user")
                return
            }

            state.activeUser.username = newUser.username,
            state.activeUser.role = newUser.role
        }
    }
});

export default store; defaultImage;