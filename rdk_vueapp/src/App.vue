<template>
  <div>
    <router-view v-if="SystemInitialised"></router-view>

    <snackbar />
  </div>
</template>

<script>
import snackbar from "@/components/snackbar-message.vue";
import Initialise from "@/libs/Initialise/initialise";

export default {
  name: "App",
  data() {
    let self = this;
    return {
      SystemInitialised: false,
      InitialiseHandler: new Initialise(self, self.$store)
    };
  },
  components: {
    snackbar
  },
  mounted() {
    let self = this;

    self.$root.$on("StartInitalisation", self.StartInit);

    setTimeout(() => {
      self.SystemInitialised = true;
    }, 500);
  },
  methods: {
    StartInit() {
      let self = this;

      self.InitialiseHandler.InitialiseServiceCaller();
    }
  }
};
</script>

<style lang="css">
html,
body {
  overflow: hidden !important;
}
</style>
