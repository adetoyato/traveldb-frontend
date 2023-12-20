<template>
<div>
<b-overlay rounded="sm">
  <div class="profile">
  <div class="card bg-dark text-black" style="max-width: 1920px;">
  <!-- <img src=../assets/img/background.jpg class="card-img" style="max-height: 929px;" alt="Stony Beach"/> -->
  <div class="card-img-overlay" style="background-color: rgba(255, 255, 255, 0.4)">
  <div class="container" style="max-width: 500px;">
    <b-card class="registration-form" style="background-color: rgba(255, 255, 255, 0.5)">
      <h3 class="mb-4">Register</h3>
      <b-form-group class="register" @submit.prevent="handleSubmit" method="post">
        <b-form-input class="mb-2" placeholder="First Name" id="fname" v-model="form.p_fname"></b-form-input>
        <b-form-input class="mb-2" placeholder="Last Name" id="lname" v-model="form.p_lname"></b-form-input>
        <b-form-input class="mb-2" placeholder="Age" type="number" id="age" v-model="form.p_age"></b-form-input>
        <b-form-input class="mb-2" placeholder="Username" id="username" v-model="form.p_username"></b-form-input>
        <b-form-input class="mb-2" placeholder="Password" type="password" id="password" v-model="form.p_password"></b-form-input>
        <b-form-select v-model="form.p_role_id" class="select mt-2 w-100 text-center" style="min-height: 30px;">
          <b-form-select-option v-for="role in options" :key="role.role_id" :value="role.role_id" >
              {{role.role_id}}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>
    
    <b-button class="btn mt-3" style="min-width: 400px;" variant="dark" @click="handleSubmit"> Register </b-button>
    <b-link class="link" href="/">Already have an account? Login </b-link>
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
import axios from "axios"
import service from "../services/service.js"
import {mapState, mapGetters} from "vuex";

export default {
  name: "Registration",
  components: {},
  created() {
    this.$store.dispatch("fetchRoles");
    this.$store.dispatch("fetchUsers");
  },
  data() {
    return {
      form: {
        p_fname: "",
        p_lname: "",
        p_age: "",
        p_username: "",
        p_password: "",
        p_role_id: 0,
      },
      selected: null,
      option: [],
      role_id: null,
    }
  },

  computed: {
    ...mapState(["rolesState"]),
    ...mapGetters(["fetchRoles"]),
    options() {
      return this.fetchRoles;
    }
  },

  methods: {

    async fetchRole () {
      this.option = [];
      var data = {
        sql: "SELECT * FROM view_roles;",
        options: "",
      }
      this.$store.dispatch("fetchRoles", data).then((res) => {
        console.log(res.data)
        res.data.forEach((val) => {
          this.option.push({ value: val.role_id, text: val.role_id });
        });
        console.log(("option", this.option));
        this.form.role = res.data;
      });
    },

    async fetchUser() {
      var data = {
        sql: "SELECT * FROM view_users;",
        options: "",
      };
      this.$store.dispatch("fetchUsers", data).then((res) => {
        console.log(res);
      })
    },

    async handleSubmit(e) {
      console.log("teswwwt", this.form) 
      await service.fetchDataFromApi(axios, {
        sql: "call insert_users($1, $2, $3, $4, $5, $6);",
        options: [this.form.p_fname, this.form.p_lname, this.form.p_age, this.form.p_username, this.form.p_password, this.form.p_role_id],
        
	      // sql: "call insert_users($1, $2, $3, $4, $5, $6);",
	      // options : ["Cale", "Henituse", "21", "slacker", "111", 2]
       
      })
      .then(
        (res) => {
          console.log("teswwwt", res)

          this.response = JSON.stringify(res);
          this.$router.push("/");
        this.form.p_fname = '',
        this.form.p_lname = '',
        this.form.p_age = '',
        this.form.p_username = '',
        this.form.p_password = '',
        this.form.p_role_id = 0
        },
        (err) => {
          console.log(err);
        },

      )
    }
  },

  validation () {
    if(this.form.role_id === null || this.form.role_id.length <1) {
      this.state.role_id = false;
    } else {
      this.state.role_id = true;
    }
  }
}

</script>

<style lang="scss" scoped>
.link {
  color: #000;
  margin-left: 105px;
}

.registration-form {
  justify-content: center;
  align-self: center;
  margin-top: 200px;
}

.btn {
  margin-left: 17px;
}

.bottom-img {
  margin-top: 8px;
}

</style>
