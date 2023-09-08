<template>
<div class="col-md-12 d-flex">
    <div class="col-md-8 mb-5 mt-3">

        <img width="40%" class="mb-2" src="../assets/logo1.png"/>

        <form>
            <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" class="m-2" v-model="email">
            </div>

            <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" class="m-2" v-model="password">
            </div>

            <div class="form-group m-3">
                <button @click="login()" class="btn btn-success col-md-3">Login</button>
            </div>
        </form>

    </div>
    
    <div class="col-md-4" id="loginBg"></div>


</div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name: "LoginPage",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters(['users', 'role'])
    },
    methods: {
        login() {
            let users = this.$store.state.users;
            

            let emailRegEx = /^[a-zA-Z0-9._ %+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;

            if (emailRegEx.test(this.email) && (passwordRegEx.test(this.password))) {
                    if (users.find(x => x.email == this.email && x.password == this.password)) {
                    let user = users.find(x => x.email == this.email && x.password == this.password)

                    localStorage.setItem("user", JSON.stringify(user));

                    this.$store.commit("userChange", user)

                    this.$router.push('/');
                    location.reload();
                }
                else {
                    alert("No user found under entered credentials.");
                    return;
                }
            }
            else {
                alert("Please enter valid credentials.");
            }
        }
    }
}
</script>


<style scoped>

#loginBg{
    background: linear-gradient(rgba(249,228,148,0.5), rgba(249,228,148,0.35)), url('../assets/loginBackground.jpg') no-repeat center center;
    background-size: cover;
    height: 80vh;
    border-left: 2px groove green;
}

</style>