<template>
  <div class="fill-height">
        <appbar v-on:toggle-drawer="drawer=!drawer">
      <h2>Статьи</h2>
      <v-spacer></v-spacer>
    </appbar>

   <v-navigation-drawer 
  width="350px"
  permanent clipped app  >
<v-list>
      <v-list-item  link to="/">
            <v-list-item-icon>
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Назад</v-list-item-title>
              
            </v-list-item-content>
            
          </v-list-item>
          <v-divider></v-divider>

</v-list></v-navigation-drawer>



    <v-content >
      <v-container  >
          <v-card v-for="(statia,i) in statii" :key="i">
              <v-card-title>{{statia.nazvanie}} </v-card-title>
              <v-card-text>{{statia.text}}</v-card-text>
          </v-card>
      
      </v-container>
    </v-content>
  </div>
</template>

<script>
import appbar from "../components/appbar.vue";

import { db } from '../db'

export default {
  components: {
    appbar, 

  },
  data: () => ({
    drawer: true,
    statii: []
  }),
  
  firestore: {
    statii: db.collection('statii'),
  },
};
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
