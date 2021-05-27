<template>
  <b-navbar class="navbar" toggleable="lg" variant="info">
    <b-navbar-brand class="logo">
      <img src="../assets/logo.png" width="200px" alt="" />
    </b-navbar-brand>
    <div class="profile">
      <b-navbar-nav>
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-row align-v="center">
              <b-col style="text-align: left">
                <div>{{ user.name }}</div>
                <div>{{ user.role }}</div>
              </b-col>
              <b-col>
                <b-icon
                  icon="person-circle"
                  style="width: 40px; height: 40px"
                ></b-icon>
              </b-col>
            </b-row>
          </template>
          <b-dropdown-item @click="signout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script>
// import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("userOtto"));
  },
  methods: {
    signout() {
      localStorage.removeItem("userOtto");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.profile {
  margin-left: auto;
  margin-right: 50px;
}
.logo {
  margin-left: 50px;
}
@media screen and (max-width: 441px) {
  .profile {
    margin-left: auto;
    margin-right: auto;
  }
  .logo {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
