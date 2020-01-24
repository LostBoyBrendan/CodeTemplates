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

      <v-btn dark @click="$router.push(`/Login`)">Go To Login</v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="8">
            <v-card>
              <v-toolbar dense color="primary">
                <span class="title">Registration</span>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field label="First Name" v-model="form.FirstName" dense outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field label="Last Name" v-model="form.LastName" dense outlined></v-text-field>
                    </v-col>
                    <v-col cols="6" class="mt-0 pt-0">
                      <v-text-field
                        label="Email Address(Username)"
                        v-model="form.Email"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="mt-0 pt-0">
                      <v-text-field
                        label="Password"
                        type="password"
                        v-model="form.Password"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-btn @click="register" class="mr-1" color="primary">Register</v-btn>
                    <v-btn @click="$router.push('/')" class="mr-1" dark>
                      <v-icon>mdi-home</v-icon>home
                    </v-btn>
                  </v-row>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        FirstName: "",
        LastName: "",
        Email: "",
        UserName: "",
        Password: "",
        ConfirmPassword: ""
      }
    };
  },
  methods: {
    register() {
      let self = this;

      self.form.ConfirmPassword = self.form.Password;
      self.form.UserName = self.form.EmailAddress;

      self
        .post(`api/Account/Register`, self.form)
        .then(r => {
          console.log(r.data);
          if (r.data) {
            self.$router.push(`/Login`);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    cancel() {
      let self = this;

      self.$router.push(`/`);
    }
  }
};
</script>