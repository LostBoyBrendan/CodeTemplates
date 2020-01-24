<template>
  <v-row class="mx-2">
    <v-toolbar flat color="transparent">
      <span class="title">
        <v-icon>mdi-checklist</v-icon>Roles &amp; Permissions
      </span>
    </v-toolbar>

    <v-col cols="12">
      <v-divider></v-divider>

      <v-col cols="12">
        <v-row>
          <v-spacer></v-spacer>
          <v-btn small color="primary" @click="createNewRole">Create</v-btn>
        </v-row>
      </v-col>

      <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.Id }}</td>
              <td>{{ item.Name }}</td>
              <td>{{ item.CanView }}</td>
              <td>{{ item.CanCreate }}</td>
              <td>{{ item.CanEdit }}</td>
              <td>{{ item.CanDelete }}</td>
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
        <v-toolbar height="30px" class="mb-3">
          <span class="title">New Role</span>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" @submit.prevent="saveRole">
            <v-text-field label="Name" v-model="RoleRequest.Name" outlined dense></v-text-field>

            <v-row>
              <v-col cols="auto shrink">
                <v-checkbox
                  v-model="RoleRequest.CanView"
                  label="Can View"
                  dense
                  hide-details
                  class="ma-0 pa-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="auto shrink">
                <v-checkbox
                  v-model="RoleRequest.CanCreate"
                  label="Can Create"
                  dense
                  hide-details
                  class="ma-0 pa-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="auto shrink">
                <v-checkbox
                  v-model="RoleRequest.CanEdit"
                  label="Can Update"
                  dense
                  hide-details
                  class="ma-0 pa-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="auto shrink">
                <v-checkbox
                  v-model="RoleRequest.CanDelete"
                  label="Can Delete"
                  dense
                  hide-details
                  class="ma-0 pa-0"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn class="success" type="submit">Save</v-btn>
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
      headers: [
        {
          text: "id",
          align: "left",
          sortable: false,
          value: "Id"
        },
        { text: "Name", value: "Name" },
        { text: "Can View", value: "CanView" },
        { text: "Can Create", value: "CanCreate" },
        { text: "Can Edit", value: "CanEdit" },
        { text: "Can Delete", value: "CanDelete" },
        { text: "Actions", value: "Id", align: "right" }
      ],
      items: [],
      RoleRequest: {
        Name: "",
        CanView: false,
        CanCreate: false,
        CanEdit: false,
        CanDelete: false
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let self = this;

      self.get(`api/Roles/GetAll`).then(r => {
        self.items = r.data;
      });
    },
    createNewRole() {
      let self = this;

      self.show = true;
    },
    saveRole() {
      let self = this;
      let request = self.RoleRequest;

      if (request.Id != null && request.Id.length > 0) {
        self.updateRole();
      } else {
        self.createRole();
      }
    },
    createRole() {
      let self = this;
      let request = self.RoleRequest;

      self
        .post(`api/Roles/Create`, request)
        .then(r => {
          if (r.data.Succeeded) {
            self.$root.$emit("show-snackbar", {
              message: "Successfully created role",
              type: "success"
            });

            self.fetchData();
          }
        })
        .catch(err => {
          self.$root.$emit("show-snackbar", {
            message: "Failed to create role : " + err.toString(),
            type: "error"
          });
        });

      self.RoleRequest = {};
      self.show = false;
    },
    updateRole() {
      let self = this;
      let request = Object.assign({}, self.RoleRequest);
      request.Id = null;

      self
        .put(`api/Roles/Update`, request)
        .then(r => {
          if (r.data.Succeeded) {
            self.$root.$emit("show-snackbar", {
              message: "Successfully updated role",
              type: "success"
            });

            self.fetchData();
          }
        })
        .catch(err => {
          self.$root.$emit("show-snackbar", {
            message: "Failed to update role : " + err.toString(),
            type: "error"
          });
        });

      self.RoleRequest = {};
      self.show = false;
    },
    modifyItem(item) {
      let self = this;

      self.RoleRequest = item;
      self.show = true;
    },
    deleteItem(item, index) {
      let self = this;

      self
        .delete(`api/Roles/Delete?id=${item.Id}`)
        .then(r => {
          if (r.data.Succeeded) {
            self.$root.$emit("show-snackbar", {
              message: "Successfully deleted role",
              type: "success"
            });

            self.items.splice(index, 1);
          }
        })
        .catch(err => {
          self.$root.$emit("show-snackbar", {
            message: "Failed to delete role : " + err.toString(),
            type: "error"
          });
        });
    }
  }
};
</script>