<template>
<div>
  <b-navbar toggleable id="nav" class="px-2" style="background-color: rgb(33, 33, 33);">
    <b-navbar-brand class="text-white" style="font-size: 30px">
      <img :src="require('../assets/img/ticons4.png')" class="mx-2" style="max-width: 40px; max-height: 40px;">
      Lou Geh Travel
    </b-navbar-brand>
    
    <b-navbar-toggle style="background-color: rgb(255, 255, 255);" target="sidebar-footer"></b-navbar-toggle>

      
    <b-sidebar id="sidebar-footer" aria-label="Sidebar with custom footer" no-header shadow :backdrop-variant="variant" backdrop>
      
      <template #footer>
      <div class="bg-dark text-light px-3 py-3 d-flex justify-content-center">
        <b-button pill variant="light" @click="logout" style="min-width: 300px;"> Sign out </b-button>
      </div>
      </template>
      <template #default>
      <div class="bg-light text-dark px-3 py-3" style="font-size: 25px;">
        <img :src="require('../assets/img/ticons4.png')" class="mx-3" style="max-width: 40px; max-height: 40px;"> Lou Geh Travel
        <div class="px-3 py-2">
        <p class="border-bottom border-dark">
    <div>
      <img :src="require('../assets/img/icon2.png')" class="mx-3 d-flex justify-content-center" style="max-width: 500px; max-height: 230px;">
    </div>
    <div>
        <b-button pill variant="dark" style="min-width: 250px;" class=" mx-1 my-2" href="/plane"> Add Destination </b-button>
    </div>
      </div>
      </div>
      </template> 
    </b-sidebar>
  
  </b-navbar>
</div>
</template>

<script>
export default {
  name: "Navbar",
  components: {

  },
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      variant: 'dark',
      currentUser: JSON.parse(localStorage.getItem("user")),
    }
  },
  methods: {
    async logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
