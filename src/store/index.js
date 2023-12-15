import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import service from "../services/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countryState: [],
    cityState: [],
  },
  getters: {
    fetchCountry: (state) => {
      return state.countryState;
    },

    fetchCity: (state) => {
      return state.cityState;
    }
  },
  mutations: {
    SET_CITY_LIST(state, cityState) {
      state.cityState = cityState;
    },

    SET_COUNTRY_LIST(state, countryState) {
      state.countryState = countryState;
    },

    ADD_CITY(state, data) {
      state.cityState.push(data);
    },

    ADD_COUNTRY(state, data) {
      state.countryState.push(data);
    },

    DELETE_CITY(state, city_id){
      let index = state.cityState.findIndex(
        (city) => city.city_id == city_id
      );
      console.log(index);
      state.city.splice(index, 0);
    },

    DELETE_COUNTRY(state, country_id){
      let index = state.countryState.findIndex(
        (country) => country.country_id == country_id
      );
      console.log(index);
      state.country.splice(index, 0);
    },

  },

  actions: {

    async fetchCity({ commit }) {
      try {
        const { data } = await service.fetchDataFromApi(axios, {
          sql: "SELECT * FROM view_city;",
        });
        commit("SET_CITY_LIST", data);
        console.log("log", data)
      } catch({ response }) {
        console.log("data", response)
        console.error(response.data.errorMsg);
      }
    },

    async fetchCountry({ commit }) {
      try {
        const { data } = await service.fetchDataFromApi(axios, {
          sql: "SELECT * FROM view_country;",
        });
        commit("SET_COUNTRY_LIST", data);
        console.log("counntries: ", data)
      } catch ({ response }) {
        console.log("data", response);
        console.error(response.data.errorMsg);
      }
    },

    async addCountry({ commit }, data) {
      const response = await service.fetchDataFromApi(axios, {
        sql: "INSERT INTO country (country_name) VALUES ($1) RETURNING *;",
      });
      commit("ADD_COUNTRY", data);
      console.log("res", response)
      console.error(response.data.errorMsg);
    },

    async addCity({ commit }, data){
      const response = await service.fetchDataFromApi(axios, {
        sql: "UPDATE cities SET country_id = $1, city_name = $2 WHERE city_id = $3;",
      });
      commit ("ADD_CITY", data);
      console.log("res", response)
      console.error(response.data.errorMsg);
    },

    async fetchPlane({ commit }) {
      try {
        const { data } = await service.fetchDataFromApi(axios, {
          sql: "SELECT * FROM view_plane;",
        });
        commit("SET_PLANE_LIST", data);
        console.log("log", data)
      } catch ({ response }) {
        console.log("data", response);
        console.error(response.data.errorMsg);
      }
    },
  },
  modules: {},
});
