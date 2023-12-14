<template>
<div>
  <AdminNavbar />
  <div class="d-flex justify-content-center">
  <b-container>
  <b-form-row class="mt-5">
  <b-row cols="2">
    <b-col>
      <b-container sm="auto" id="container" class="rounded py-2 pt-3" style="background-color: rgba(0, 0, 0, 0.7); min-height: 170px;">
        <b-col>
        <b-form-group>
          <h4 class="text-white">Add City</h4>
          <b-modal centered hide-footer title="Add Country" id="country">
            <b-form-input placeholder="Enter Country"></b-form-input>
            <b-button-group class="mt-3 float-right">
            <b-button variant="danger" class="mx-1">Cancel</b-button>
            <b-button variant="success"> Submit </b-button>
            </b-button-group>
          </b-modal>
          <b-form-select :options="option" @change="fetchCountry()" v-model="selected" class="select mt-2 w-100 text-center" style="min-height: 30px;"></b-form-select>
          <b-form-input placeholder="Enter City" id="airline" class="mt-3 text-center d-flex justify-content-center"></b-form-input>
          <b-button-group class="mt-3 float-right" >
          <b-button class="mx-2" variant="warning" style="min-width: 100px;" v-b-modal.country>Add Country</b-button>
          <b-button style="min-width: 100px;" variant="success">Submit</b-button>
          </b-button-group>
        </b-form-group>
        </b-col>
      </b-container>
    </b-col>
    
    <b-col>
    <b-container>
      <b-table
        id="city-table"
        class="text-white text-center table-dark"
        style="background-color: rgba(0, 0, 0, 0.7); min-width: 800px"
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
            @click="deletePlane(row)">
            <b-icon class="delete-btn" icon="trash-fill"></b-icon>
          </b-button>
        </template>
      </b-table>
      <b-pagination class="pagination" style="margin-left: 300px;" rounded v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="cityState"></b-pagination>
    </b-container>
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


export default {
  components: {
    AdminNavbar
  },
  created() {
    // this.fetchPlane();
    this.$store.dispatch("fetchCity");
    this.$store.dispatch("fetchCountry");
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
      selected: null,
      option: [],
      cityList: [],
    };
  },
  computed: {
    ...mapState(["cityState"]),
    ...mapGetters(["city/fetchCity", "country/fetchCountry"]),
    rows() {
      return this.cityState.length;
    },
    items() {
      console.log(cityState);
      return this.cityState;
    },
    options() {
      console.log(countryState);
      return this.countryState;
    }
  },

  methods: {
    // async deletePlane(row) {
    //   await this.$store.dispatch("deletePlane", row.item.plane_id).then(
    //     (res) => {
    //       this.fetchPlane();
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // },

    async fetchCity() {
      var data = {
        sql: "SELECT * FROM view_city;",
        options: "",
      };
      this.$store.dispatch("fetchcity", data).then((res) => {
        console.log(res);
        this.cityList = res.data;
      });
    },

    async fetchCountry () {
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

  },
  //   async fetchCountry() {
  //     this.options = [];
  //     var data = {
  //       sql: "SELECT * FROM view_country;",
  //       options: "",
  //     };
  //     this.$store.dispatch("fetchCountry", data).then((res)=> {
  //     console.log(res);
  //     });
  //   },
  // },

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

<style></style>
