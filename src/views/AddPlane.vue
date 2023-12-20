<template>
<div style="background-color: rgb(109, 152, 134); min-height: 919px;">
  <AdminNavbar />
  <div class="d-flex justify-content-center">
  <b-container style="margin-left: 280px;">
  <b-form-row class="mt-5">
  <b-row cols="2">
    <b-col>
      <b-container sm="auto" id="container" class="rounded py-2 pt-3" style="background-color: rgb(217, 202, 179); min-height: 170px;">
        <b-col>
        <b-form-group>
          <b-button class="mb-2 float-right" style="background-color: rgb(58, 99, 82); min-width: 120px; max-height: 40px;" v-b-modal.country>Add Country</b-button>
          <h4 class="ml-1 text-black">Add City</h4>
          <b-modal centered hide-footer title="Add Country" id="country">
            <b-form-input v-model="country_name" placeholder="Enter Country"></b-form-input>
            {{country_name}}
            <b-button-group class="mt-3 float-right">
            <b-button variant="danger" class="mx-1">Cancel</b-button>
            <b-button @click="saveCountry" variant="success"> Submit </b-button>
            </b-button-group>
          </b-modal>
          <b-form-select v-model="selected" class="select mt-2 w-100 text-center" style="min-height: 30px;">
            <b-form-select-option v-for="country in options" :key="country.country_id" :value="country.country_id">
              {{country.country_name}}
            </b-form-select-option>
          </b-form-select>
          <b-form-input v-model="city_name" placeholder="Enter City" id="airline" class="mt-3 d-flex justify-content-center"></b-form-input>
          <b-button-group class="mt-3 float-right" >
          <b-button style="background-color: rgb(58, 99, 82); min-width: 120px; max-height: 40px;" type="submit" @click="saveCity">Submit</b-button>
          </b-button-group>
        </b-form-group>
        </b-col>
      </b-container>
    </b-col>
    <b-col>
    <b-container style="min-width: 830px; min-height: 40px;">
      
      <b-button-group class="float-right">
        <b-button class="mr-2" style="background-color: rgb(58, 99, 82); min-width: 120px; max-height: 40px;" v-b-modal.view_country> View Countries </b-button>
        <b-button style="background-color: rgb(58, 99, 82); min-width: 120px; max-height: 40px;" v-b-modal.view_users> View Users </b-button>
      </b-button-group>
      <h4 class="ml-1 text-black">Available Cities:</h4>

    </b-container>
      <b-container>
      <b-table
        id="city-table"
        class="text-black text-center table-light mt-2"
        style="background-color: rgb(217, 202, 179); min-width: 800px"
        striped
        :per-page="perPage"
        :current-page="currentPage"
        :items="cityState"
        :fields="fields">
        <template #cell(delete)="row">
          <b-button
            class="btn btn-danger"
            title="Delete"
            id="delete"
            type="submit"
            @click="deleteCity(row)">
            <b-icon class="delete-btn" icon="trash-fill"></b-icon>
          </b-button>
        </template>
      </b-table>
      <b-pagination class="pagination" style="margin-left: 300px;" rounded v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="cityState"></b-pagination>
    </b-container>
    <b-modal centered hide-footer title="Add Country" id="view_country">
        <b-table
        id="city-table"
        class="text-black text-center table-light mt-2"
        striped
        :per-page="perPages"
        :current-page="currentPages"
        :items="countryState"
        :fields="country_fields">
        <template #cell(delete)="row">
          <b-button
            class="btn btn-danger"
            title="Delete"
            id="delete"
            type="submit"
            @click="deleteCountry(row)">
            <b-icon class="delete-btn" icon="trash-fill"></b-icon>
          </b-button>
        </template>
      </b-table>
      <b-pagination class="pagination d-flex justify-content-center" rounded v-model="currentPages" :total-rows="rows" :per-page="perPages" aria-controls="countryState"></b-pagination>
    </b-modal>
    <b-modal centered hide-footer title="Add Country" id="view_users" size="lg">
        <b-table
        id="city-table"
        class="text-black text-center table-light mt-2"
        striped
        :per-page="perPaged"
        :current-page="currentPaged"
        :items="userState"
        :fields="user_fields">
        <template #cell(delete)="row">
          <b-button
            class="btn btn-danger"
            title="Delete"
            id="delete"
            type="submit"
            @click="deleteUser(row)">
            <b-icon class="delete-btn" icon="trash-fill"></b-icon>
          </b-button>
        </template>
      </b-table>
      <b-pagination class="pagination d-flex justify-content-center" rounded v-model="currentPaged" :total-rows="rows" :per-page="perPaged" aria-controls="userState"></b-pagination>
    </b-modal>
    </b-col>
  </b-row>
  </b-form-row>
  </b-container>
  </div>
</div>
</template>

<script>
import AdminNavbar from "../components/AdminNavbar.vue";
import { mapState, mapGetters } from "vuex";
import service from "../services/service.js";
import axios from 'axios';


export default {
  components: {
    AdminNavbar
  },
  created() {
    // this.fetchPlane();
    this.$store.dispatch("fetchCity");
    this.$store.dispatch("fetchCountry");
    this.$store.dispatch("fetchUsers");
  },
  data() {
    return {
      city: {
        city_id: "",
        country_id: "",
        country_name: "",
        city_name: "",
      },
      perPage: 5,
      currentPage: 1,
      perPages: 5,
      currentPages: 1,
      perPaged: 5,
      currentPaged: 1,
      fields: [
        {
          key: "country_name",
          label: "Country Name",
          sortable: true,
        },
        {
          key: "city_name",
          label: "City Name",
          sortable: true,
        },
        {
          key: "delete",
          label: "Delete",
        },
      ],
      country_fields: [
        {
          key: "country_name",
          label: "Country Name",
          sortable: true
        },
        {
          key: "delete",
          label: "Delete"
        }
      ],
      user_fields: [
        {
          key: "fname",
          label: "First Name",
          sortable: true
        },
        {
          key: "lname",
          label: "Last Name",
          sortable: true
        },
        {
          key: "age",
          label: "Age",
          sortable: true
        },
        {
          key: "username",
          label: "Username",
          sortable: true
        },
        {
          key: "password",
          label: "Password",
          sortable: true
        },
        {
          key: "delete",
          label: "Delete"
        }
      ],
      selected: null,
      option: [],
      cityList: [],
      countryList: [],
      userList: [],
      city_name: null,
      country_name: null,
      selectedCityId: null,
      selectedCountryId: null,
      selectedUserId: null,
    };
  },
  computed: {
    ...mapState(["cityState", "countryState", "userState"]),
    ...mapGetters(["fetchCity", "fetchCountry", "fetchUsers"]),
    rows() {
      return this.cityState.length;
      return this.countryState.length;
      return this.userState.length;
    },
    items() {
      console.log(cityState);
      return this.cityState;
      return this.countryState;
      return this.userState;
    },
    options() {
      // console.log(countryState);
      return this.fetchCountry;
    }
  },

  methods: {
    getCityId(city_id) { 
      this.selectedCityId = city_id;
      // console.log(this.selectedCityId);
    },

    getCountryId(country_id) {
      this.selectedCountryId = country_id;
    },

    getUserId(user_id) {
      this.selectedUserId = user_id;
    },

    async deleteCity(row) {
      const response = await service.fetchDataFromApi(axios, {
        sql: "DELETE from cities WHERE city_id = $1;",
        options: [row.item.city_id],
      }).then(
        (res) => {
          this.getCityId(row.item.city_id);
        },
        (err) => {
          console.log(err);
        }
      );
    },

    async deleteCountry(row) {
      const response = await service.fetchDataFromApi(axios, {
        sql: "DELETE from country WHERE country_id = $1;",
	      options : [row.item.country_id]
      }).then(
        (res) => {
          this.getCountryId(row.item.country_id);
        },
        (err) => {
          console.log(err);
        }
      )
    },

    async deleteUser(row) {
      const response = await service.fetchDataFromApi(axios, {
        sql: "DELETE from users WHERE user_id = $1;",
        options: [row.item.user_id]
      }).then(
        (res) => {
          this.selectedUserId(row.item.user_id);
        },
        (err) => {
          console.log(err);
        }
      )
    },

    async fetchCities() {
      var data = {
        sql: "SELECT * FROM view_city;",
        options: "",
      };
      this.$store.dispatch("fetchcity", data).then((res) => {
        console.log(res);
        this.cityList = res.data;
      });
    },

    async fetchCountryTable() {
      var data = {
        sql: "SELECT * FROM view_country;",
        options: "",
      };
      this.$store.dispatch("fetchcountry", data).then((res) => {
        console.log(res);
        this.countryList = res.data;
      });
    },

    async fetchUserTable() {
      var data = {
        sql: "SELECT * FROM view_users;",
        options: "",
      };
      this.$store.dispatch("fetchuser", data).then((res) => {
        console.log(res);
        this.userList = res.data;
      });
    },

    async fetchCountries () {
      this.option = [];
      var data = {
        sql: "SELECT * FROM view_country;",
        options: "",
      }
      this.$store.dispatch("fetchCountry", data).then((res) => {
        console.log(res.data)
        res.data.forEach((val) => {
          this.option.push({ value: val.country_id, text: val.country_name });
        });
        console.log("option", this.option);
        this.city.country_name = res.data;
      });
    },

    async saveCountry(e) {
      e.preventDefault()
      await service.fetchDataFromApi(axios, {
        sql: "INSERT INTO country (country_name) VALUES ($1) RETURNING *;",
        options: [this.country_name],
      })
      .then(
        (res) => {
          this.$store.dispatch("fetchCountry");
          this.country_name = "";
        },
        (err) => {
          console.log(err);
        }
      )
    },

    async saveCity(e) {
      e.preventDefault()
      await service.fetchDataFromApi(axios, {
        sql: "INSERT INTO cities (country_id, city_name) VALUES ($1, $2) RETURNING *;",
        options: [this.selected, this.city_name],
      })
      .then(
        (res) => {
          this.$store.dispatch("fetchCity");
          this.selected = "";
          this.city_name = "";
        }, 
        (err)=> {
          console.log(err);
        }
      )
    },
  },

  validation() {
    if (this.city.city_name === null || this.city.city_name.length< 1) {
      this.state.city_name = false;
    } else {
      this.state.city_name = true;
    }
    if (this.city.country_name === null || this.city.country_name.length< 1) {
      this.state.country_name = false;
    } else {
      this.state.country_name = true;
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
