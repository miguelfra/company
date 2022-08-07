<template>
  <v-app v-if="token">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
       
        <router-link
          class="white--text text-h4 text-decoration-none mr-0"
          to="/products"
          >Products</router-link
        >
      </div>

      <v-spacer></v-spacer>
       <router-link class="white--text text-decoration-none" to="/newProduct">
       <v-btn color="success" class="mr-10">New Product</v-btn>
       </router-link>
      
        <router-link  v-if="admin" class="white--text text-decoration-none" to="/adminPanel">
           <v-btn color="blue" class="mr-10">
              ADMIN Control <v-icon dark> mdi-wrench </v-icon>
           </v-btn>
        </router-link>
     
      <logout />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>

  <v-app v-else>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link class="white--text text-h4 text-decoration-none" to="/"
          >Home</router-link
        >
      </div>

      <v-spacer></v-spacer>
      <v-btn color="success" class="mr-10">
        <router-link
          class="text-h4 white--text text-decoration-none"
          to="/signin"
          >Sign In</router-link
        >
      </v-btn>

      <v-btn color="success">
        <router-link
          class="white--text text-h4 text-decoration-none"
          to="/Signup"
          >Sign UP</router-link
        >
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Logout from "./components/Logout.vue";

export default {
  components: { Logout },
  name: "App",
  data: () => ({
    token: localStorage.getItem("token"),
    rol: localStorage.getItem("rol"),
    admin: false,
  }),

  methods: {
    userRol() {
      if (this.rol === "admin") {
        return (this.admin = true);
      }
    },
  },
  mounted() {
    this.userRol();
    this.token;
  },
};
</script>
