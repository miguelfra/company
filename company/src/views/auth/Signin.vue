<template>
<v-container>
 
    <v-form class="purple mt-10 lighten-1 p-10 rounded-lg white--text" ref="form"  lazy-validation>
           <h1 class="text-center">Sign In</h1>

      <v-text-field
       class="white--text"
       color="primary"
        v-model="user.email"
        :rules="emailRules"
        label="E-mail"
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
            @click:append="show1 = !show1"
          ></v-text-field>
      

      <v-btn  color="success" class="mr-4" @click="Signin">
        Register
      </v-btn>
    </v-form>
</v-container>
</template>


<script>
import axios from 'axios'
export default {
  data: () => ({
    user: {
      email: "",
      password: ""
    },
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
   
    passwordRules: [
      (v) => !!v || "password is required",
      (v) => (v && v.length <= 10) || "password must be less than 10 characters",
    ],
    show1: false,
    rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        }
  }),

  
  methods: {
   async Signin() {
    try {
       if (this.$refs.form.validate()) {
        
        const data = await axios.post("http://localhost:3000/api/auth/signin", this.user)
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('rol', data.data.rol)
            window.location.href = '/'
      }else{
       this.$alertify.error('llena Todos los campos')
      }
    } catch (error) {
      this.$alertify.error(error.response.data.Message);
    }
     
    },
  },
};
</script>


<style >
.v-application .purple.lighten-1{
padding: 10px ;
}
.v-counter{
  color: white !important;
    font-size: 13px;
}
</style>