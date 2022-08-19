<template>
  <v-container>
    <v-form
      class="theme--dark primary mt-10 lighten-1 p-10 rounded-lg white--text"
      ref="form"
      lazy-validation
    >
      <h1 class="text-center">New Product</h1>
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
        <v-btn color="success" class="mr-4" @click="NewProduct">
          Create Product
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>


<script>
import axios from "axios";
export default {
  data: () => ({
    product: {
      name: "",
      category: "",
      price: "",
    },
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
    NewProduct() {
        if (this.$refs.form.validate()) {
            this.$store.dispatch('newProduct', this.product);
            this.$alertify.success('PRODUCT SAVED');
            this.$router.push('/products');
        } else {
            this.$alertify.error('LLENE LOS CAMPOS REQUERIDOS')
        }
    },
    
  },
};
</script>


<style >
.v-application .primary.lighten-1 {
  padding: 10px;
}
</style>