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
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <v-row class="fill-height" align="center">
          <v-col cols="12">
            <v-col cols="12" class="text-center">
              <span class="display-1">
                <b>Welcome to - {{SystemName}}</b>
              </span>
            </v-col>

            <v-col cols="12">
              <v-row justify="center">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    flat
                    width="500"
                    :elevation="hover ? 10 : 0"
                    :style="hover? 'border: 1px solid': ''"
                    class="mr-1"
                    @click="$router.push(`/Login`)"
                  >
                    <v-toolbar dense flat>
                      <v-col cols="12" class="text-center">
                        <span class="title">
                          <b>Login</b>
                        </span>
                      </v-col>
                    </v-toolbar>

                    <v-card-text class="text-center">
                      <v-icon :color="hover ? 'primary' : ''" size="100">mdi-account-arrow-right</v-icon>
                    </v-card-text>
                  </v-card>
                </v-hover>
                <div style="position:absolute;z-index:1; top: 50%;">
                  <v-avatar
                    size="60"
                    color="white"
                    style="border: 1px solid !important;"
                    class="elevation-10"
                  >
                    <span class="black--text headline">OR</span>
                  </v-avatar>
                </div>
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    flat
                    width="500"
                    :elevation="hover ? 10 : 0"
                    :style="hover? 'border: 1px solid': ''"
                    class="ml-1"
                    @click="$router.push('/Registration')"
                  >
                    <v-toolbar dense flat>
                      <v-col cols="12" class="text-center">
                        <span class="title">
                          <b>Register</b>
                        </span>
                      </v-col>
                    </v-toolbar>

                    <v-card-text class="text-center">
                      <v-icon :color="hover ? 'primary' : ''" size="100">mdi-account-plus</v-icon>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-row>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      SystemName: "System Name",
      username: "",
      password: ""
    };
  }
};
</script>
