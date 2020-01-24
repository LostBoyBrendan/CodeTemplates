<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" floating app clipped color="transparent">
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <span class="title">Application</span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="item in items" :key="item.title" @click="$router.push(item.path)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-app-bar app color="transparent" flat dense clipped-left>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <span class="title">App Name</span>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>-->
    <v-content class="custom-background">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      miniVariant: true,
      items: [
        {
          icon: "mdi-clipboard-text-outline",
          title: "Roles & Permissions",
          path: "/Main/RolePermissions"
        },
        {
          icon: "mdi-account-group",
          title: "User maintenance",
          path: "/Main/Users"
        }
      ]
    };
  }
};
</script>

<style lang="css">
.custom-background {
  background: rgb(31, 29, 30);
  background: linear-gradient(
    0,
    rgba(31, 29, 30, 1) 0%,
    rgba(237, 237, 237, 1) 0%,
    rgba(237, 237, 237, 1) 94%,
    rgba(31, 29, 30, 0.5) 100%
  );
}
</style>