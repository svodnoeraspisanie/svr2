<template>
  <div class="fill-height">
    <appbar v-on:toggle-drawer="drawer=!drawer">
      <h2 class="pl-2">{{pr.nazvanie}}</h2>
      <v-spacer></v-spacer>
    </appbar>

    <v-navigation-drawer 
  width="350px"
  permanent clipped app  >
     

        <v-list>

            <v-list-item  link to="/predpriyatiya" exact>
            <v-list-item-icon>
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Назад</v-list-item-title>
              
            </v-list-item-content>
            
          </v-list-item>
<v-divider></v-divider>

          <v-list-item class="px-1 py-0">
            <v-list-item-content>
              <v-img :src="pr.obraz" aspect-ratio="1.5" max-width="500px" contain>
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>

              <v-card-title>{{pr.nazvanie}}</v-card-title>
              <v-card-text>{{pr.kratkoe_opisanie}}</v-card-text>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-btn block color="green">Поддержать</v-btn>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-card-actions class="pb-0">
                <b>Место:</b>

                <v-chip v-for="(mesto, nm) in pr.mesto" :key="nm" small>{{mesto}}</v-chip>
              </v-card-actions>
              <v-card-actions class="pb-0">
                <div width="100%">
                  <b>Метки:</b>
                  <v-chip v-for="(metka, nm) in pr.metki" :key="nm" small>{{metka}}</v-chip>
                </div>
              </v-card-actions>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>

</v-navigation-drawer>

    <v-content>
      <v-container>
        <v-card class="mb-2">
          <v-card-title>Что мы делаем?</v-card-title>
          <v-card-text v-html="pr.podrobnoe_opisanie"></v-card-text>
        </v-card>

        <v-card class="mb-2">
          <v-card-title>Как нас поддержать?</v-card-title>
          <v-card-text>
            <ul v-for="(schet,gate) in pr.scheta">
              <li>{{gate}}: {{schet}}</li>
            </ul>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>Наши страницы в сети</v-card-title>
          <v-card-text>
            <ul v-for="(ssilka,servis) in pr.ssilki">
              <li>
                <a v-bind:href="ssilka">{{servis}}</a>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import appbar from "../components/appbar.vue";

import { db } from "../db";
import { app } from "../main";

export default {
  components: {
    appbar,

  },
  data: () => ({
    drawer: true,

    pr: null
  }),
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      
      db.collection("predpriyatiya")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          this.pr = snapshot.data();
       
        });
    }
  }
};
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
