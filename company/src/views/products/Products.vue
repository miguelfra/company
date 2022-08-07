<template>
  <div class="container d-flex justify-center align-center">
    <v-simple-table class="mt-5" v-if="condition == true">
      <template v-slot:default>
        <thead>
          <tr>
            <th
              class="
                text-left
                white--text
                font-weight-bold
                text-h4
                blue-grey
                darken-3
              "
            >
              Name
            </th>
            <th
              class="
                text-left
                white--text
                font-weight-bold
                text-h4
                blue-grey
                darken-3
              "
            >
              Category
            </th>
            <th
              class="
                text-left
                white--text
                font-weight-bold
                text-h4
                blue-grey
                darken-3
              "
            >
              Price
            </th>
            <th
              class="
                text-left
                white--text
                font-weight-bold
                text-h4
                blue-grey
                darken-3
              "
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td
              class="
                blue-grey
                font-weight-bold
                darken-3
                border-bottom
                blue--text
                font-size
              "
            >
              {{ item.name }}
            </td>
            <td
              class="
                blue-grey
                font-weight-bold
                darken-3
                border-bottom
                blue--text
                font-size
              "
            >
              {{ item.category }}
            </td>
            <td
              class="
                blue-grey
                font-weight-bold
                darken-3
                border-bottom
                blue--text
                font-size
              "
            >
              {{ item.price }}
            </td>

            <td class="blue-grey font-weight-bold darken-3 border-bottom">
              <div class="d-flex">
                <BtnEdit :id="item" />
                <BtnDelete :item="item" />
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
     
     <div class="d-flex justify-center margin " v-if="condition == 'nada'">
       <v-progress-circular 
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-progress-circular 
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-progress-circular 
      indeterminate
      color="primary"
    ></v-progress-circular>
     </div>
   

    <div class="error pa-16 rounded-xl font-weight-bold" v-if="!condition">
      <div class="text-center">
        <p>No hay ningun Producto guardado aun.</p>
        <router-link to="/newProduct">Crea uno!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BtnDelete from "../../components/BtnDelete.vue";
import BtnEdit from "../../components/BtnEdit.vue";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
      condition:  'nada',
  }),
  computed: {
    ...mapState(["products"]),
  },
  methods: {
    ...mapActions(["GETProductsAction"]),
     async chek(){
         const valor = await this.GETProductsAction();
        if (valor.length > 0) {
          this.condition = true;
        } else {
         this.condition = false;
        }
    }
  },
  mounted() {
    this.$store.dispatch("GETProductsAction");
    this.chek();
  },
  components: { BtnDelete, BtnEdit },
};
</script>

<style>
.margin{
  margin-top: 203px;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: 1px solid rgba(234, 226, 235, 0.267) !important;
}
.font-size {
  font-size: 20px !important;
}
</style>