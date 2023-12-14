<template>
  <div id="app">
    <Navbar v-if="!Navbar" />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
export default {
  name: "app",
  components: {
    Navbar,
  },
  data () {
    return {
      Navbar: null,
    };
  },
  created () {
    this.checkRoute();
  },
  mounter() {},
  methods: {
    checkRoute() {
      if (
        this.$route.name === "register" || 
        this.$route.name === "login" ||
        this.$route.name === "home" ||
        this.$route.name === "plane"
      ) {
        this.Navbar = true ;
        return;
        this.Navbar = false;
      }
    }
  },
  watch: {
    $route () {
      this.checkRoute();
    },
  }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inclusive+Sans&family=Kanit:ital,wght@1,300&display=swap');

 *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}

/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}*/

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
