<template>
<div>
<b-overlay rounded="sm">
  <div class="profile">
  <div class="card bg-dark text-white" style="max-width: 1920px;">
  <img src=../assets/img/background.jpg class="card-img" style="max-height: 929px;" alt="Stony Beach"/>
  <div class="card-img-overlay" style="background-color: rgba(0, 0, 0, 0.4)">
  <div class="container" style="max-width: 500px;">
    <b-card class="register" style="background-color: rgba(255, 255, 255, 0.5)">
    <b-row>
      <b-form-group
      label-cols-lg="3"
      label="Register"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
      <b-col>
        <b-form-group
        label="First Name"
        label-for="fName"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="fName"></b-form-input>
      </b-form-group>
      </b-col>

      <b-col>
        <b-form-group
        label="Last Name:"
        label-for="lName"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="lName"></b-form-input>
      </b-form-group>
      </b-col>

      <b-form-group
        label="Age:"
        label-for="age"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="age"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Username:"
        label-for="username"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="username"></b-form-input>
      </b-form-group>

    <b-form-group
        label="Password:"
        label-for="password"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input type="password" id="password"></b-form-input>
      </b-form-group>
    
    <b-row>
    <b-button class="btn mt-3" style="max-width: 435px;" variant="dark"> Register </b-button>
    <b-link class="link" href="/">Already have an account? Login </b-link>
    </b-row>
    </b-form-group>
    </b-row>
  </b-card>
  </div>
  </div>
<Footer />
  </div>
  </div>
  </b-overlay>
</div>
</template>

<script>

</script>

<style lang="scss" scoped>
.link {
  color: #000;
  margin-left: 105px;
}

.register {
  justify-content: center;
  align-self: center;
  margin-top: 160px;
}

.btn {
  margin-left: 17px;
}

</style>
