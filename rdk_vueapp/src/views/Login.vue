<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn dark @click="$router.push(`/Registration`)">Go To Registration</v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <v-row class="fill-height" align="center" justify="center">
          <v-card width="500px">
            <v-toolbar dense>
              <span class="title">
                <b>Login</b>
              </span>
            </v-toolbar>

            <v-card-text>
              <v-form ref="form" @submit.prevent="login">
                <v-text-field
                  label="Username"
                  prepend-icon="mdi-account"
                  dense
                  v-model="username"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="Password"
                  prepend-icon="mdi-lock"
                  dense
                  v-model="password"
                  type="password"
                  outlined
                ></v-text-field>
                <v-card-actions>
                  <v-col cols="12" class="ma-0 pa-0">
                    <v-btn class="mb-2" block color="primary" type="submit">Login</v-btn>
                    <v-btn block dark @click="$router.push(`/`)">
                      <v-icon>mdi-home</v-icon>Home
                    </v-btn>
                  </v-col>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      let self = this;

      let request = {
        grant_type: "password",
        username: self.username,
        password: self.password
      };

      axios
        .post(`http://localhost:54784/Token`, qs.stringify(request), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(r => {
          if (r.data != null && r.data.access_token != null) {
            localStorage.setItem("access_token", r.data.access_token);
            self.$router.push("/Main");
          }
        });
    }
  }
};
</script>
