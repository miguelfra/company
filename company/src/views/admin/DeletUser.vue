<template>
  <v-container>
    <h1 class="text-center">Delete A User</h1>
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
              Delete
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
              <v-btn @click="DeleteUser" color="error">
                <v-icon left> mdi-delete </v-icon>
                DELETE
              </v-btn>
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
    user: false,
    alert: true,
  }),
  components: { Search },
  computed: {
    ...mapState(["search"]),
  },
  methods: {
    async DeleteUser() {
      const id = this.search;

      this.$alertify.confirm(
        `<h3>are you sure  to delete this User</h3>`,
        async () => {
          await axios.delete(
            `https://company-api-v1.herokuapp.com/api/admin/userDelete/${id}`,
            {
              headers: {
                "x-access-token": localStorage.getItem("token"),
              },
            }
          );
          this.$alertify.success("User Deleted");
          this.$router.push("/adminPanel");
        },
        () => this.$alertify.error("canceled")
      );
      
    },

    async getUserById() {
      const search = this.search;
      try {
        if (search === "") {
          this.user = false;
        } else {
          const data = await axios(
            `https://company-api-v1.herokuapp.com/api/admin/user/${search}`,
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
  },

  watch: {
    search() {
      this.getUserById();
    },
  },
};
</script>

<style>

</style>