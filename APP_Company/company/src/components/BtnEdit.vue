<template>
  <router-link :to="`editProduct/${id.id}`" class="text-decoration-none">
    <v-btn color="warning" class="mr-5">
      <v-icon left> mdi-pencil </v-icon>
      Edit
    </v-btn>
  </router-link>
</template>

<script>
export default {
  props: { id: Object },
};
</script>