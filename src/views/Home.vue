<template>
  <div>
    <Navbar />
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      background="#ababab"
      img-width="1920"
      img-height="500"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">
      <b-carousel-slide style="max-width: 1920px; max-height: 500px;" :img-src="require('../assets/img/image1.jpg')"></b-carousel-slide>
      <b-carousel-slide style="max-width: 1920px; max-height: 500px;" :img-src="require('../assets/img/image2.jpg')"></b-carousel-slide>
      <b-carousel-slide style="max-width: 1920px; max-height: 500px;" :img-src="require('../assets/img/image3.jpg')"></b-carousel-slide>
    </b-carousel>
    

    <div>
      <div class="mt-2 booking d-flex justify-content-center">
      <b-container sm="auto" id="container" class="rounded py-2 pt-3" style="background-color: rgba(0, 0, 0, 0.6); max-width: 800px; max-height: 120px;">
        <b-form-row>
          <div>
            <b-row cols="2">
            <b-col>
              <b-button id="chooseBtn" class="ml-4" style="min-width: 380px;" v-b-modal.destination-modal variant="light"> Choose Destination </b-button>
            </b-col>
            <div>
              <b-modal centered id="destination-modal" ref="modal" hide-footer title="Choose Destination">
              <b-row class="d-flex justify-content-center">
                <b-table hover class="text-center" :items="cityState" :fields="destinationFields" :per-page="perPage" :current-page="currentPage">
                  <template v-slot:cell(Confirm)="{ item }">
                    <div>
                      <b-button v-b-modal @click="selectDestination(item)">
                        <b-icon icon="check"></b-icon>
                      </b-button>
                    </div>
                  </template>
                </b-table>
                <div class="overflow-auto">
                  <div>
                    <h6 class="text-white">Current Page: {{ currentPage }}</h6>
                    <b-pagination align="center" pills v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="listFlights"></b-pagination>
                  </div>
                </div>
              </b-row>
              <div class="col-xs-3">
                <b-button class="mt-2 mr-2 position-relative" variant="danger" type="submit" @click="hideModal"> Cancel </b-button>
              </div>
            </b-modal>
            <b-col class="ml-5">
            <b-form-datepicker name="date" placeholder="Choose Departure Date" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric',}"
            :min="new Date()" today-button reset-button menu-class="w-100" calendar-width="100%" close-button v-model="destination.date_confirmed"></b-form-datepicker>
            </b-col>
            </div>
            </b-row>
            
              <div>
              <b-row cols="3">
                <b-col class="py-3">
                <div class="ml-4 col">
                  <div class="select text-white">
                    Country: <strong>{{ this.destination.country_name }}</strong>
                  </div>
                </div>
                </b-col>
                <b-col  class="py-3">
                <div class="select text-white">
                  City: <strong>{{ this.destination.city_name }}</strong>
                </div>
                </b-col>
            <b-col class="py-3 float-right">
              <b-button right class="bookBtn" type="submit" style="min-width: 200px; margin-left: 65px" variant="success" @click="bookTravel">Book Travel</b-button>
            </b-col>
            </b-row>
            </div>
          </div>
        </b-form-row>
      </b-container>
      </div>

      <div class="mt-5 d-flex justify-content-center">
      <b-card :img-src="require('../assets/img/clipart3.png')" border-variant="white" style="max-width: 1300px;" img-alt="Card image" img-top>
      <b-card-body title="Why fly when traveling?" class="d-flex justify-content-center"></b-card-body>
        <b-card-text class="d-flex justify-content-center text-center" style="font-size: 18px;"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolorum nemo expedita distinctio culpa possimus fuga, nulla fugiat enim cumque provident rem facilis ea pariatur quis maiores impedit? Ab, iste. </b-card-text>
      </b-card>
      </div>

    <div class="mt-4 d-flex justify-content-center">
    <b-card-group group>
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="require('../assets/img/ticons1.png')" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Travel safer!">
          <b-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut debitis vero dolorem quos.
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>

  <b-card no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="require('../assets/img/ticons2.png')" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Plan your destination!">
          <b-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, autem.
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>

  <b-card no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="require('../assets/img/ticons3.png')" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Know your schedule!">
          <b-card-text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</b-card-group>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },

  created() {
    this.$store.dispatch("fetchCity");
  },
    data() {
      return {
        slide: 0,
        sliding: null,
        destination: {
          city_id: "",
          country_id: "",
          country_name: "",
          city_name: "",
          date_confirmed: "",
        },
        perPage: 4,
        currentPage: 1,
        destinationFields: [ 
          { key: "country_name", label: "Country"},
          { key: "city_name", label: "City"},
          { key: "Confirm", label: "Confirm"}
        ],
        cityList: [],
      }
    },
    methods: {
      showToggle() {
        setTimeout(() => {
          this.show = false;
        }, 1000);
      },
        countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
        },
        showAlert() {
          this.dismissCountDown = this.dismissSecs
        },
        hideModal() {
          this.$refs["modal"].hide();
        },

        setNow() {
          const now = new Date();
        },

        showModal(id) {
          this.index = id;
        },

      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },

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
    },
    computed: {
      ...mapState(["cityState"]),
      ...mapGetters(["city/fetchCity"]),
      rows() {
        return this.cityState.length
      },
      items() {
        console.log(cityState);
        return this.cityState;
      },
    },

}
</script>

<style lang="scss" scoped>


</style>