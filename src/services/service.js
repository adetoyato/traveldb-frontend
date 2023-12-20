export default {
    async fetchDataFromApi($axios, params) {
        console.log("resssset", params)
      const response = await $axios.post(
        "http://172.16.4.182:3660/api/opennuse/",
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  };