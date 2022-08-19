<template>
  <v-container>
    <v-form
      class="purple mt-10 lighten-1 p-10 rounded-lg white--text"
      ref="form"
      lazy-validation
    >
      <h1 class="text-center">Sign UP</h1>
      <v-text-field
        class="white--text"
        v-model="user.username"
        :rules="usernameRules"
        label="username"
        @keydown.enter="Signup"
        required
      ></v-text-field>

      <v-text-field
        class="white--text"
        color="primary"
        v-model="user.email"
        :rules="emailRules"
        label="E-mail"
        @keydown.enter="Signup"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @keydown.enter="Signup"
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn color="success" class="mr-4" @click="Signup">
        Create Account
      </v-btn>
    </v-form>
  </v-container>
</template>


<script>
import axios from "axios";
export default {
  data: () => ({
    user: {
      username: "",
      email: "",
      password: "",
    },
    usernameRules: [(v) => !!v || "username is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    passwordRules: [
      (v) => !!v || "password is required",
      (v) =>
        (v && v.length <= 10) || "password must be less than 10 characters",
    ],
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  methods: {
    async Signup() {
      try {
        if (this.$refs.form.validate()) {
          const NewUser = await axios.post("https://company-api-v1.herokuapp.com/api/auth/signup",this.user);
          localStorage.setItem('token', NewUser.data.token);
          localStorage.setItem('rol', NewUser.data.rol)
          window.location.href = '/products'
        } else {
          this.$alertify.error("llena Todos los campos");
        }
      } catch (error) {
        this.$alertify.error(error.response.data.message);
      }
        
      
        // this.user.email = ""
        
      
    },
  },
};
</script>


<style >
.v-application .purple.lighten-1 {
  padding: 10px;
}
.v-counter {
  color: white !important;
  font-size: 13px;
}
</style>