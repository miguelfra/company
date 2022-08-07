<template>
  <v-container>
    <h1 class="text-center">Edit role A User</h1>
    <search />

    <v-simple-table class="mt-5" v-if="user">
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
              Username
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
              email
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
              rol
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
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
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
              {{ user.username }}
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
              {{ user.email }}
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
              {{ user.rol }}
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
              <v-btn color="warning" class="mr-5"  @click="editUser"> 
                <v-icon left> mdi-pencil </v-icon>
                change rol
              </v-btn>


              <v-checkbox
         
                v-model="user.rol"
                value="User"
                label="User"
                type="checkbox"
                required
              ></v-checkbox>

              <v-checkbox
             
                v-model="user.rol"
                value="admin"
                label="Admin"
                type="checkbox"
                required
              ></v-checkbox>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="error pa-16 rounded-xl font-weight-bold mt-10" v-else>
      <div class="text-center">
        <p class="text-h3">User Not found !!!</p>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import Search from "../../components/Search.vue";
import { mapState } from "vuex";
export default {
  data: () => ({
    rol: 'user',
    user: false,
    alert: true,
  }),
  components: { Search },
  computed: {
    ...mapState(["search"]),
  },
  methods: {
    async getUserById() {
      const search = this.search;
      try {
        if (search === "") {
          this.user = false;
        } else {
          const data = await axios(
            `http://localhost:3000/api/admin/user/${search}`,
            {
              headers: {
                "x-access-token": localStorage.getItem("token"),
              },
            }
          );
          this.user = data.data;
        }
      } catch (error) {}
    },
async newProduct(context, product) {
       axios.post('http://localhost:3000/api/products', product, {
        headers: {
          "x-access-token":  token
        }
       })
    },
    async editUser() {
       axios.put(
        `http://localhost:3000/api/admin/userRol/${this.user.id}`,
        {rol: this.user.rol},
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

      this.$alertify.success('Rol Updated')
      this.$router.push('/adminPanel')
    },
  },

  watch: {
    search() {
      this.getUserById();
    },
  },
};
</script>

