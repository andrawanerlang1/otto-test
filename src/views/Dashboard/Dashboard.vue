<template>
  <div>
    <Navbar />
    <b-row>
      <b-col cols="12" sm="2" class="sidebar">
        <div class="button-wrapper">
          <b-col
            v-show="this.user.role == 'Admin' || this.user.role == 'Operation'"
          >
            <b-button class="custom-button" @click="getData('Operation')">
              Dashboard Operations
            </b-button>
          </b-col>
          <b-col
            v-show="this.user.role == 'Admin' || this.user.role == 'Sales'"
          >
            <b-button class="custom-button" @click="getData('Sales')">
              Dashboard Sales
            </b-button>
          </b-col>
        </div>
      </b-col>
      <b-col style="text-align: left">
        <div class="title-table">
          <div v-if="!dashboardName">
            Please select the dashboard on the sidebar
          </div>
          <div v-else>{{ dashboardName }}</div>
          <div class="table">
            <b-table table-variant="info" striped hover :items="data"></b-table>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar";
import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    Navbar,
  },
  data() {
    return {
      data: [],
      user: {},
      dashboardName: null,
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("userOtto"));
  },
  methods: {
    getData(type) {
      axios
        .get(
          `https://antares.pede.id/portal-interview/v1/dashboard?page=1&type=${type}`
        )
        .then((response) => {
          if (response.data.code == 400) {
            this.$toasted.error(response.data.message);
          } else {
            console.log(response.data);
            this.data = response.data.data.user;
            this.dashboardName = "Dashboard " + type;
          }
        });
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: rgba(20, 162, 245, 0.486);
  margin: 30px 0px 0px 20px;
  min-height: 400px;
}
.title-table {
  margin: 30px;
}
.table {
  margin-top: 30px;
}
.custom-button {
  width: 100%;
  text-align: left;
  background-color: white;
  color: black;
  border: 0px;
  margin-top: 10px;
}
.button-wrapper {
  margin-top: 30px;
}
@media screen and (max-width: 750px) {
  .custom-button {
    font-size: 12px;
  }
}
@media screen and (max-width: 570px) {
  .sidebar {
    min-height: 0px;
    width: 90%;
  }
  .button-wrapper {
    padding-bottom: 30px;
  }
}
</style>
