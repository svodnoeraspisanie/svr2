<template>
  <div class="fill-height">

   <v-navigation-drawer 
  width="300px" 
  permanent clipped app  >
           <v-list-item to="/">
        <v-list-item-content>

         <v-img src="/svora.png" contain></v-img>
    

        </v-list-item-content>
      </v-list-item>
<v-divider></v-divider>
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



    <v-content  >
      <v-container  >
        <h2>Статьи</h2>
          <v-card v-for="(statia,i) in statii" :key="i" elevation="1" class="mb-2">
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
