<template>
  <v-container>
    <h1 class="mt-5 text-center">ADMIN PANEL</h1>

    <h3 class="text-center mt-5 text-h4">App Users</h3>

    <div class="d-flex justify-space-between">
      <router-link to="/editRol" class="text-decoration-none justify-start">
        <v-btn class="ml-0 mb-2" color="warning" dark>
          Edit rol to user
          <v-icon dark right> mdi-pencil </v-icon>
        </v-btn>
      </router-link>

      <router-link to="/deleteUser" class="text-decoration-none d-flex justify-end">
        <v-btn class="mr-0 mb-2" color="error" dark>
          Delete A user
          <v-icon dark right> mdi-delete </v-icon>
        </v-btn>
      </router-link>
    </div>


    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      class="elevation-1 blue font-weight-bold"
    ></v-data-table>
  </v-container>
</template>


<script>
const token = localStorage.getItem("token");
import axios from "axios";
export default {
  data() {
    return {
      headers: [
        {
          text: "Username",
          align: "start",
          sortable: false,
          value: "username",
        },
        {
          text: "Correo",
          align: "start",
          sortable: false,
          value: "email",
        },
        { text: "Rol", value: "rol" },
        { text: "Created At", value: "created_at" },
        { text: "Id", value: "id" },
      ],
      users: [],
    };
  },

  methods: {
    async GetUsers() {
      const data = await axios("https://company-api-v1.herokuapp.com/api/admin/user", {
        headers: {
          "x-access-token": token,
        },
      });
      this.users = data.data;
    },
  },

  mounted() {
    this.GetUsers();
  },
};
</script>
 

