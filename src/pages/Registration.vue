<template>
    <div class="col-md-12 d-flex">
        <div class="col-md-8 mb-5 mt-3">

            <img width="40%" class="mb-2" src="../assets/logo1.png" />

            <form id="regForm">

                <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" class="m-2" v-model="name">
                    </div>


                    <div class="form-group">
                        <label for="surname">Surname:</label>
                        <input type="text" id="surname" class="m-2" v-model="surname">
                    </div>

                    <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="text" id="email" class="m-2" v-model="email">
                        </div>

                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" class="m-2" v-model="username">
                </div>

                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" class="m-2" v-model="password">
                </div>

                 <div class="form-group">
                        <label for="passwordCon">Re-enter password:</label>
                        <input type="password" id="passwordCon" class="m-2" v-model="passwordCon">
                    </div>

                    <div>
                        <b-modal v-model="modalShow">{{ message }}</b-modal>
                    </div>

                <div class="form-group m-3">
                    <button @click="register()" class="btn btn-success col-md-3">Register</button>
                </div>
            </form>

        </div>

        <div class="col-md-4" id="loginBg"></div>


    </div>
</template>

<script>
export default {
    name: "RegistrationPage",
    data() {
        return {
            name: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            passwordCon: '',
            modalShow: false,
            message: ''
        }
    },
    methods: {
        register() {

            let nameRegEx = /^[A-Z][a-z0-9_-]{3,19}$/;
            let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;
            let emailRegEx = /^[a-zA-Z0-9._ %+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            let write = true;
            let role = "user";

            let users = this.$store.state.users;

            let userToAdd = {
                name: this.name,
                surname: this.surname,
                username: this.username,
                email: this.email,
                password: this.password,
                role: role
            }
            if ((this.password == this.passwordCon) && this.password != '' && nameRegEx.test(this.name) && nameRegEx.test(this.surname) && passwordRegEx.test(this.password) && passwordRegEx.test(this.passwordCon) && emailRegEx.test(this.email))
            {
                users.forEach(user => {
                    if (user.email == this.email) {
                        write = false;
                    }
                })
                if (write == false) {
                    this.modalShow = true;
                    this.message = "Please enter a valid email adress or a user with that email address already exists.";
                }
                if (write == true) {
                    this.modalShow = true;
                    users.push(userToAdd);
                    this.message = "Registration successful! You can go ahead and log into your account now.";
                }
            }
            else {
                this.modalShow = true;
                this.message = "Invalid data. Your name and last name must start with a capital letter and the password must include at least 3 characters.";
            }
        },
        formReset() {
            let form = document.getElementById("regForm");
            form.reset();
        }
    },
    mounted() {
    },
}
</script>


<style scoped>
#loginBg {
    background: linear-gradient(rgba(249, 228, 148, 0.5), rgba(249, 228, 148, 0.35)), url('../assets/loginBackground.jpg') no-repeat center center;
    background-size: cover;
    height: 80vh;
    border-left: 2px groove green;
}
</style>