<template>
  <v-btn @click="deleteItem" color="error">
    <v-icon left> mdi-delete </v-icon>
    DELETE
  </v-btn>
</template>

<script>
const token = localStorage.getItem('token');
import axios from "axios";
export default {
  props: { item: Object },
  methods: {
    deleteItem() {
      const { id } = this.item;
      this.$alertify.confirm(
        `<h3>are you sure to delete ${this.item.name}</h3>`,
        async () => {
          await axios.delete(`http://localhost:3000/api/products/${id}`, {
            headers: {
              "x-access-token": token,
            },
          });
          this.$alertify.success("Article Deleted");
          this.$router.push("/newProduct");
        },
        () => this.$alertify.error("canceled")
      );
    },
  },
};
</script>

