<template>
    <div id="home">
        <div class="col-md-12 d-flex section">
            <div class="col-md-5 p-4">
                <img width="65%" src="../assets/logo1.png"/>
                <h2 class="display-6">Welcome to CulinaryExplorer!</h2>
                <h3>Your go-to place to find delicious recipes from all around the world!</h3>
            </div>
            <div class="col-md-7">
                <div id="banner" class="d-flex">
                    <div class="col-md-2">
                        <div class="forHeight col-md-4">
                        </div>

                        <div class="forHeight col-md-6">
                            
                        </div>

                        <div class="forHeight col-md-8">
                            
                        </div>
                        
                        <div class="forHeight col-md-10">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-12 d-flex section">
                <div class="col-md-5 p-2" id="cover">
                        <div class="col-md-5 p-5 coverText">
                            <h2><strong>What do we do?</strong></h2>
                            <p> Our platform is dedicated to curating a diverse and delightful collection of cooking recipes from around the world. 
                            Whether you're a seasoned chef or a beginner in the kitchen, our carefully crafted recipe collection offers something for everyone.</p>
                        </div>
                </div>

                <div class="col-md-5 center mt-5">
    <h2 class="mb-4 mt-5"><strong>What is our mission?</strong></h2>
                        <p class="fs-5">Our mission is to inspire and empower you on your culinary journey, providing step-by-step guides, helpful tips, and a vibrant community where you can share your culinary experiences.
                                 Join us in exploring the world of flavors, aromas, and the joy of cooking!</p>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomePage"
}
</script>

<style scoped>

#home div{
    border-radius: 0px;
}

#cover{
    background: url('../assets/cover1.jpg');
    background-size: cover;
    border-right: 2px solid green;
}

.coverText{
    margin: 5% 18% 0px 18%;
}
.forHeight{
    height: 25%;
    background-color: beige;
    border-radius: 0px 50px 50px 0px !important;
}

.toLeft{
    height: 14.3%;
    background-color: #2f2e2a;
    border-radius: 50px 0px 0px 50px !important;
}

.section{
    border-bottom: 2px solid green;
}

#banner{
    background: linear-gradient(rgba(249,228,148,0.5), rgba(249,228,148,0.35)), url('../assets/banner.jpg') no-repeat top center;
    background-size: cover;
    height: 60vh;
}

</style>