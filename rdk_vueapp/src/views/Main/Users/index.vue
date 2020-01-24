<template>
  <v-row class="mx-2">
    <v-toolbar flat color="transparent">
      <span class="title">
        <v-icon>mdi-checklist</v-icon>Users
      </span>
    </v-toolbar>

    <v-col cols="12">
      <v-divider></v-divider>

      <v-col cols="12">
        <v-row>
          <v-spacer></v-spacer>
          <v-btn small color="primary" @click="createNewUser">Create</v-btn>
        </v-row>
      </v-col>

      <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.Id }}</td>
              <td>{{ item.FirstName }}</td>
              <td>{{ item.LastName }}</td>
              <td>{{ item.Email }}</td>
              <td class="text-right">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" icon>
                      <v-icon>mdi-settings</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item @click="modifyItem(item)">
                      <v-list-item-title>Modify</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteItem(item, index)">
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-col>

    <v-dialog v-model="show" width="500px">
      <v-card width="100%">
        <v-toolbar dense color="primary" class="mb-3">
          <span class="title">New User</span>
          <v-spacer></v-spacer>
          <v-btn @click="cancelNewUser" icon outlined small>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" @submit.prevent="saveUser">
            <v-text-field label="First Name" v-model="UserRequest.FirstName" outlined dense></v-text-field>
            <v-text-field label="Last Name" v-model="UserRequest.LastName" outlined dense></v-text-field>
            <v-text-field label="Email" v-model="UserRequest.Email" outlined dense></v-text-field>

            <v-row v-if="UserRequest.Id == null">
              <v-text-field
                class="px-1"
                label="Password"
                v-model="UserRequest.Password"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                class="px-1"
                label="Confirm Password"
                v-model="UserRequest.ConfirmPassword"
                outlined
                dense
              ></v-text-field>
            </v-row>

            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn class="success" type="submit">Save</v-btn>
              <v-divider vertical class="mx-1"></v-divider>
              <v-btn dark @click="cancelNewUser">Cancel</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      show: false,
      changePassword: false,
      headers: [
        {
          text: "id",
          align: "left",
          sortable: false,
          value: "Id"
        },
        { text: "First Name", value: "FirstName" },
        { text: "Last Name", value: "LastName" },
        { text: "Email", value: "Email" },
        { text: "Actions", value: "Id", align: "right" }
      ],
      items: [],
      UserRequest: {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let self = this;

      self
        .get(`api/Users/GetAll`)
        .then(r => {
          if (r.data != undefined) {
            self.$root.$emit("show-snackbar", {
              message: "Successfully fetched users",
              type: "success"
            });

            self.items = r.data;
          }
        })
        .catch(err => {
          self.$root.$emit("show-snackbar", {
            message: "Failed to load users : " + err.toString(),
            type: "error"
          });
        });
    },
    createNewUser() {
      let self = this;

      self.UserRequest = {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
      };

      self.show = true;
    },
    cancelNewUser() {
      let self = this;

      self.show = false;
      self.UserRequest = {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
      };
    },
    saveUser() {
      let self = this;
      let request = self.UserRequest;

      if (request.Id != null && request.Id.length > 0) {
        self.updateUser();
      } else {
        self.createUser();
      }
    },
    createUser() {
      let self = this;
      let request = self.UserRequest;
      request.UserName = request.Email;

      self
        .post(`api/Users/Create`, request)
        .then(r => {
          if (r.data.Succeeded) {
            self.$root.$emit("show-snackbar", {
              message: "Successfully created user",
              type: "success"
            });

            self.fetchData();
          }
        })
        .catch(err => {
          self.$root.$emit("show-snackbar", {
            message: "Failed to create user : " + err.toString(),
            type: "error"
          });
        });

      self.UserRequest = {};
      self.show = false;
    },
    updateUser() {
      let self = this;
      let request = self.UserRequest;

      self
        .put(`api/Users/Update`, request)
        .then(r => {
          if (r.data.Succeeded) {
            self.$root.$emit("show-snackbar", {
              message: "Successfully updated User",
              type: "success"
            });

            self.fetchData();
          }
        })
        .catch(err => {
          self.$root.$emit("show-snackbar", {
            message: "Failed to update user : " + err.toString(),
            type: "error"
          });
        });

      self.UserRequest = {};
      self.show = false;
    },
    modifyItem(item) {
      let self = this;

      self.UserRequest = item;
      self.show = true;
    },
    deleteItem(item, index) {
      let self = this;

      self
        .delete(`api/Users/Delete?id=${item.Id}`)
        .then(r => {
          if (r.data.Succeeded) {
            self.$root.$emit("show-snackbar", {
              message: "Successfully deleted user",
              type: "success"
            });

            self.items.splice(index, 1);
          }
        })
        .catch(err => {
          self.$root.$emit("show-snackbar", {
            message: "Failed to delete user : " + err.toString(),
            type: "error"
          });
        });
    }
  }
};
</script>