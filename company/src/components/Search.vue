<template>
  <v-container  class="blue p-10 rounded-pill">
    <v-text-field
   
      v-model="search"
      name="input-10-1"
      label="search user By ID"
    ></v-text-field>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data: () => ({
    search: 0,
  }),
  methods: {
    ...mapActions['setUsernameAction']
  },

  watch: {
    search(){
        this.$store.dispatch('setUsernameAction',this.search)    
    }
  }
};
</script>

<style>
</style>