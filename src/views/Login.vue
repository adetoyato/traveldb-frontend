<template>
<div>
<b-overlay rounded="sm">
  <div class="profile">
  <div class="card bg-dark text-black" style="max-width: 1920px;">
  <!-- <img src=../assets/img/border.jpg class="card-img" style="max-height: 929px;" alt="Stony Beach"/> -->
  <div class="card-img-overlay" style="background-color: rgba(0, 0, 0, 0.0)">
  <div class="container" style="max-width: 500px;">
    <b-card class="card-login" style="background-color: rgba(255, 255, 255, 0.5)">
      <h3 class="mb-4">Login</h3>
      <b-form-group class="login" @submit.prevent="handleLogin" method="post">
        <b-form-input class="mb-3" placeholder="Username" id="username" v-model="form.username"></b-form-input>
        <b-form-input class="mb-2" type="password" placeholder="Password" id="password" v-model="form.password"></b-form-input>
        <b-button class="btn mt-1 mb-2" style="min-width: 400px; max-height: 40px;" variant="dark" @click="handleLogin"> Login </b-button>
        <b-link class="link" href="register">Don't have an account? Sign up </b-link>
      </b-form-group>
  </b-card>
  </div>
  </div>
<Footer />
  </div>
  </div>
  </b-overlay>
</div>
</template>

<script>
import service from "../services/service.js"
import axios from "axios"
import { mapState, mapGetters } from "vuex";

export default {
  name: "login",
  components: {},
  data() {
    return{
      form: {
        username: null,
        password: null,
      },
      username: [],
      password: [],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },

    validation() {
      if (this.username == null || this.username < 1) {
        this.form.username = false;
      } else { 
        this.form.username = true;
      }
      if (this.password == null || this.password < 1) {
        this.form.password = false;
      } else {
        this.form.password = true;
      }
      return this.username != null && this.password;
    },

    handleLogin(e) {
      // service.fetchDataFromApi(axios, {
      //   sql: "SELECT * FROM view_users;",
      //   options: [this.username, this.password],
      // })
      const user = { username : this.username, password: this.password };
      this.$store.dispatch("login", user)
      console.log("test", this.$store.dispatch)
      .then(
        (res) => {
          if(this.username && this.password) {
            console.log("this", this.username, this.password);
          }
          // this.form.username,
          // this.form.password
        },
        (err) => {
          console.log(err.response.data.error);
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>

.card-login {
  justify-content: center;
  align-self: center;
  margin-top: 250px;
}

.btn {
  margin-left: 17px;
}

.link {
  color: #000;
  margin-left: 105px;
}

.bottom-img {
  margin-top: 157px;
}

</style>
