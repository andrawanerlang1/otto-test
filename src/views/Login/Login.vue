<template>
  <div class="background">
    <div class="border">
      <div class="wrapperMain">
        <div>
          <img src="../../assets/logo.png" class="logo-image" />
        </div>
        <div class="loginTop">Portal Dashboard</div>
        <br />
        <b-container>
          <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
            <b-form-group
              id="input-group-2"
              class="inputLabel"
              label="Username:"
              label-for="input-2"
              description="Make sure to use the right username"
            >
              <b-form-input
                id="input-2"
                class="inputForm"
                style="color: black; font-weight: bold"
                v-model="form.username"
                type="text"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              class="inputLabel"
              label="Password:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                class="inputForm"
                style="color: black; font-weight: bold"
                v-model="form.password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <div style="text-align: right">
              <b-button class="loginButton" type="submit" variant="primary"
                >Login</b-button
              >
            </div>
          </b-form>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      show: false,
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      axios
        .get(
          `https://antares.pede.id/portal-interview/v1/login?username=${this.form.username}&password=${this.form.password}`
        )
        .then((response) => {
          if (response.data.code == 400) {
            console.log(response.data.message);
            this.$toasted.error(response.data.message);
          } else {
            console.log(response.data.data);
            localStorage.setItem(
              "userOtto",
              JSON.stringify(response.data.data)
            );
            this.$router.push("/Dashboard");
          }
        });
    },
  },
};
</script>

<style scoped>
.background {
  background-image: url("../../assets/bg-batik.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.border {
  padding-top: 100px;
  padding-bottom: 100px;
}
.wrapperMain {
  background-color: white;
  width: 60%;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: black 2px solid;
  text-align: left;
  margin: auto;
  padding: 20px 30px 20px 30px;
}
.loginTop {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #7e98df;
}
.inputLabel {
  color: #7e98df;
  font-weight: bold;
  margin-top: 20px;
}
.inputForm {
  border: white solid 2px;
  border-bottom: black 2px solid;
  margin-top: 20px;
}
.forgot {
  margin-top: 30px;
}
.loginButton {
  margin-top: 30px;
  background-color: #7e98df;
  font-size: 20px;
  font-weight: bold;
  color: white;
  width: 300px;
  height: 50px;
  border-radius: 300px;
}
.logo-image {
  width: 200px;
}
@media screen and (max-width: 650px) {
  .wrapperMain {
    width: 90%;
  }
}
@media screen and (max-width: 500px) {
  .loginButton {
    font-size: 18px;
    height: 60px;
    width: 80%;
  }
  .logo-image {
    width: 150px;
  }
  .loginTop {
    text-align: left;
    margin-top: 10px;
    font-size: 20px;
  }
}
</style>
