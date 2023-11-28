<template>
<div>
  <b-navbar id="nav" toggleable="lg" type="light" variant="light">
    <b-navbar-brand>Travel</b-navbar-brand>
    
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  
    <b-collapse id="nav-collapse" is-nav>
  
  <div>
      <b-navbar-nav>
        <b-nav-item exact-active-class="active" to="dashboard"> Dashboard </b-nav-item>
          <b-nav-item exact-active-class="active" to="booking"> Booking </b-nav-item>
      </b-navbar-nav>
  </div>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            Profile
          </template>
          <b-dropdown-item href="profile"> See Profile </b-dropdown-item>
          <b-dropdown-item> Log out </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: "Navbar",
  components: {

  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
