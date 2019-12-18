<template>
  <div class="fill-height">
  

   <v-navigation-drawer  permanent  app  clipped width="300px"  >

   
<v-list class="my-0 py-0">
      <v-list-item  link to="/" dense>
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
       <v-container  class="px-6" >
    

        <h2>Русские национальные предприятия</h2>
        <v-row>
          <v-col lg="3" md="4" sm="6" cols="12" v-for="pr in predpriyatiya" :key="pr.n">
            <v-card class="flexcard cardhov" height="100%" :to="{path: `/predpriyatiya/${pr.id}`}"  elevate="0"  flat>
              <v-img :src="pr.obraz" aspect-ratio="1.5" contain>
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>

              <v-card-title>{{pr.nazvanie}}</v-card-title>
              <v-card-text>{{pr.kratkoe_opisanie}}</v-card-text>

              <v-spacer />

              <v-divider />

              <v-card-actions class="pb-0">
                Место: 

                <v-chip v-for="(mesto, nm) in pr.mesto" :key="nm" small style="height:18px; margin-left:2px">{{mesto}}</v-chip>
              </v-card-actions>
              <v-card-actions  class="pt-0">
               
                  Метки: 
                  <v-chip v-for="(metka, nm) in pr.metki" :key="nm" small style="height:18px; margin-left:2px">{{metka}}</v-chip>
                
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
    
      </v-container>
    </v-content>
  </div>
</template>

<script>
import appbar from "../components/appbar.vue";
import minitoolbar from "../components/minitoolbar.vue";
import { db } from '../db'

export default {
  components: {
    appbar, 
 minitoolbar,
  },
  data: () => ({
    drawer: true,
    predpriyatiya: []
  }),
  
  firestore: {
    predpriyatiya: db.collection('predpriyatiya'),
  },
};
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
.cardhov:hover{

  background-color:#eeeeee;
}
</style>
