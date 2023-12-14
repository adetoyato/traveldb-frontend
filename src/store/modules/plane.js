import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import service from "../../services/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    planeState: [],
  },
  getters: {
    fetchPlane: (state) => {
      return state.planeState;
    },
  },
  mutations: {
    SET_PLANE_LIST(state, planeState) {
      state.planeState = planeState;
    },

    ADD_PLANE(state, data) {
      state.planeState.push(data);
    },

    DELETE_PLANE(state, plane_id) {
      let index = state.planeState.findIndex(
        (plane) => plane.plane_id == plane_id
      );
      console.log(index);
      state.plane.splice(index, 0);
    },
  },
  actions: {
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
