<template>
  <div class="d-flex flex-column flex-center flex-column-fluid p-10 ">
    <!--begin::Illustration-->
    <!--end::Illustration-->

    <!--begin::Message-->
    <h1 class="fw-bold mb-10 text-h1 white--text mt-16 text-center" style="color: #a3a3c7">
      404
    </h1>
    <!--end::Message-->

    <!--begin::Link-->
    <router-link to="/" class="btn btn-primary fw-bold mb-10 text-h5 white--text  text-center"
      >Return Home</router-link
    >
  </div>
</template>


<script>
  
export default {
  name: 'Notfound'
}
</script>


<style scoped>
.h-100 {
  height: 100vh;
}
</style>