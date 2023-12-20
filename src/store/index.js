import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import service from "../services/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countryState: [],
    cityState: [],
    userState: [],
    rolesState: [],
    loggedIn: false,
    user: {},
    
  },
  getters: {
    fetchCountry: (state) => {
      return state.countryState;
    },

    fetchCity: (state) => {
      return state.cityState;
    },

    fetchRoles: (state) => {
      return state.rolesState;
    },

    fetchUsers: (state) => {
      return state.userState;
    }
  },
  mutations: {
    //login
    loginSuccess(state, user) {
      state.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },

  //CRUD
    SET_CITY_LIST(state, cityState) {
      state.cityState = cityState;
    },

    SET_COUNTRY_LIST(state, countryState) {
      state.countryState = countryState;
    },

    SET_ROLES_LIST(state, rolesState) {
      state.rolesState = rolesState
    },

    SET_USER_LIST(state, userState) {
      state.userState = userState
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
    async login({ commit }, user){
      return await axios
    },

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

    async fetchRoles({ commit }) {
      try {
        const { data } = await service.fetchDataFromApi(axios, {
          sql: "SELECT * FROM view_roles;",
        });
        commit("SET_ROLES_LIST", data);
        console.log("roles", data)
      } catch ({ response }) {
        console.log("data", response)
        console.error(response.data.errorMsg)
      }
    },

    async fetchCountry({ commit }) {
      try {
        const { data } = await service.fetchDataFromApi(axios, {
          sql: "SELECT * FROM view_country;",
        });
        commit("SET_COUNTRY_LIST", data);
        console.log("countries: ", data)
      } catch ({ response }) {
        console.log("data", response);
        console.error(response.data.errorMsg);
      }
    },

    async fetchUsers({ commit }) {
      try {
        const { data } = await service.fetchDataFromApi(axios, {
          sql: "SELECT * FROM view_users;",
        });
        commit("SET_USER_LIST", data);
        console.log("user: ", data)
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

    async login({ commit }, user) {
      return await service.fetchDataFromApi(axios, {
        sql: "call insert_users($1, $2, $3, $4, $5, $6);",
        options: [user.username, user.password],
      })
      .then((response) => {
        if(response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data));
          let role_id = response.data.res[0].role_id;
          if (role_id == 1) {
            router.push("/plane");
          } else {
            router.push("/home");
          }
        }
        commit("loginSuccess", user);
        return response;
      })
    },

    logout({ commit }) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      commit("logout");
    }

    // async fetchPlane({ commit }) {
    //   try {
    //     const { data } = await service.fetchDataFromApi(axios, {
    //       sql: "SELECT * FROM view_plane;",
    //     });
    //     commit("SET_PLANE_LIST", data);
    //     console.log("log", data)
    //   } catch ({ response }) {
    //     console.log("data", response);
    //     console.error(response.data.errorMsg);
    //   }
    // },
  },
  modules: {},
});
