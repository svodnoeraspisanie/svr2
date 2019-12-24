<template>
  <div class="fill-height">
    <v-navigation-drawer width="300px" permanent clipped app>
      <v-list>
        <v-list-item link to="/" dense>
          <v-list-item-icon>
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Назад</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-content >
      <v-container class="px-6">
        <v-row justify="center">
          <v-col cols="auto" class="pt-0">
            <div style="max-width:936px" class="pb-3">
              <h2>Справка</h2>
            </div>
            <v-card 
              v-for="(spravka,i) in spravki"
              :key="i"
              elevation="1"
              class="mb-6 ml-2"
              max-width="936px"
            >
              <v-card-title>{{spravka.nazvanie}}</v-card-title>
              <v-card-text v-html="spravka.tekst"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>

import { db } from "../db";

export default {
  components: {
 
  },
  data: () => ({
    drawer: true,
    spravki: []
  }),

  firestore: {
    spravki: db.collection("spravki")
  }
};
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
