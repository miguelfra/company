<template>
  <v-container>
    <v-form
      class="theme--dark primary mt-10 lighten-1 p-10 rounded-lg white--text"
      ref="form"
      lazy-validation
    >
      <h1 class="text-center">Edit Product</h1>
      <v-text-field
        class="white--text"
        v-model="product.name"
        :rules="name"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        class="white--text"
        color="primary"
        v-model="product.category"
        :rules="category"
        label="Category"
        required
      ></v-text-field>

      <v-text-field
        class="white--text"
        color="primary"
        v-model="product.price"
        :rules="price"
        label="Price"
        required
      ></v-text-field>

      <div class="d-flex justify-end">
        <v-btn color="success" class="mr-4" @click="EditProduct">
          Edit Product
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>


<script>
const token = localStorage.getItem("token");
import axios from "axios";
export default {
  data: () => ({
    product: {},
    name: [(v) => !!v || "name is required"],
    category: [(v) => !!v || "category is required"],

    price: [(v) => !!v || "price is required"],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  methods: {
    EditProduct() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("EditProduct", this.product);
        this.$alertify.success("PRODUCT UPDATE");
        setTimeout(() => {
          this.$router.push("/products");
        }, 1500);
      } else {
        this.$alertify.error("LLENE LOS CAMPOS REQUERIDOS");
      }
    },
    async GETProduct() {
      try {
        const { id } = this.$route.params;
        const product = await axios.get(
          `https://company-api-v1.herokuapp.com/api/products/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
       this.product = product.data;
      } catch (error) {
        this.$alertify.error(error.response.data.message);
        this.$router.push("/products");
      }
    },
  },
  mounted() {
    this.GETProduct();
  },
};
</script>


<style >
.v-application .primary.lighten-1 {
  padding: 10px;
}
</style>