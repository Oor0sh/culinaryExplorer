<template>
    <footer class="text-center text-black bg-success">
      <div class="container pt-4">
        <div><h5>Follow us here:</h5></div>
        <section class="mb-4 mt-4 col-md-6 center d-flex justify-content-around">

            <div>
                <a href="#"><i class="bi bi-facebook"></i></a>
            </div>

            <div>
                <a href="#"><i class="bi bi-instagram"></i></a>
            </div>

            <div>
                <a href="#"><i class="bi bi-twitter"></i></a>
            </div>

            <div>
                <a href="#"><i class="bi bi-pinterest"></i></a>
            </div>

            <div>
                <a href="#"><i class="bi bi-youtube"></i></a>
            </div>

        </section>
      </div>
      <div class="text-center text-dark p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2023 Copyright: Uroš Cvetkovski
      </div>
    </footer>
</template>

<script>
export default {
    name: "FooterComponent"
}
</script>

<style scoped>
i{
    color: rgb(255, 162, 0);
    font-size: larger;
}
h5{
    color: rgb(255, 162, 0);
}
div{
    border-radius: 0px !important;
}
</style>