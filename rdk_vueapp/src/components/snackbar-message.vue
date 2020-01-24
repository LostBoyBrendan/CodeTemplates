<template>
  <slide-x-right-transition group>
    <div
      v-for="(message, idx) in messageStack"
      :key="idx"
      class="snackbar-message elevation-20"
      :ref="`snackbar-${idx}`"
      :style="checkTop(message, idx)"
    >
      <v-row no-gutters>
        <v-col cols="11">
          <v-row no-gutters>
            <span class="subtitle" color="white">{{ message.type.toUpperCase() }}</span>
          </v-row>
          <v-row no-gutters>
            <span>{{ message.msg }}</span>
          </v-row>
        </v-col>
        <v-icon @click="removeMessage(message)">mdi-close</v-icon>
      </v-row>
    </div>
  </slide-x-right-transition>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      msg: "",
      type: null,
      messageStack: [],
      defaultTimeout: 5000
    };
  },
  computed: {
    color() {
      let self = this;
      switch (self.type) {
        case "error":
          {
            return "red";
          }
          break;
        case "success":
          {
            return "green";
          }
          break;
      }
    }
  },
  mounted() {
    let self = this;

    self.$root.$on("show-snackbar", self.ShowMessage);
    self.$root.$on("hide-snackbar", self.HideMessage);
  },
  methods: {
    ShowMessage(data) {
      let self = this;

      let newMessage = {
        msg: data.message,
        type: data.type,
        color: data.type == "success" ? "green" : "red",
        height: 15,
        snackbar: true
      };

      self.messageStack.push(newMessage);

      self.$nextTick(() => {
        self.calcTop(newMessage);
      });

      setTimeout(() => {
        self.messageStack.shift();
      }, 5000);
    },
    HideMessage() {
      let self = this;
      self.msg = "Loading";
      self.snackbar = false;
    },
    removeMessage(message) {
      let self = this;
      let index = self.messageStack.indexOf(message);

      self.messageStack.splice(index, 1);
    },
    calcTop(message) {
      let self = this;

      let index = self.messageStack.indexOf(message);

      // if (index > 0) {
      //   self.$nextTick(() => {
      //     let height = self.$refs[`snackbar-${index - 1}`][0].$el.clientHeight;

      //     message.height = height;
      //   });
      // }
    },
    checkTop(message, idx) {
      let self = this;

      return `top: ${message.height}px; background-color: ${message.color}`;

      // if (idx == 0) {
      // } else {
      //   return `top: ${(idx + 1) * message.height}px;`;
      // }
    }
  }
};
</script>

<style>
.snackbar-message {
  position: fixed;
  padding: 7px;
  height: auto;
  width: 350px;
  right: 10px;
  z-index: 205;
  border-radius: 10px;
  color: white;
}
</style>