<template>
  <div class="fill-height">
  

   <v-navigation-drawer  permanent  app  >

    <v-list-item to="/" >
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


      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Поиск:</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Место:</v-list-item-title>

          <v-select :items="city"></v-select>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Метки:</v-list-item-title>

          <v-flex v-for="(selection, i) in selections" :key="selection.text" shrink>
            <v-chip :disabled="loading" close @click:close="selected.splice(i, 1)">
              <v-icon left v-text="selection.icon"></v-icon>
              {{ selection.text }}
            </v-chip>
          </v-flex>

          <v-flex v-if="!allSelected" xs12>
            <v-text-field
              ref="search"
              v-model="search"
              full-width
              hide-details
              label="Поиск"
              single-line
            ></v-text-field>
            <v-divider v-if="!allSelected"></v-divider>
          </v-flex>

          <v-list>
            <template v-for="(item, i) in categories">
              <v-list-item
                v-if="!selected.includes(i)"
                :key="i"
                :disabled="loading"
                @click="selected.push(i)"
              >
                <v-list-item-avatar>
                  <v-icon :disabled="loading" v-text="item.icon"></v-icon>
                </v-list-item-avatar>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-list-item-content>
      </v-list-item>
</v-list></v-navigation-drawer>



    <v-content >
      <v-container   >
        <h2>Список русских национальных предприятий</h2>
        <v-row>
          <v-col lg="3" md="4" sm="6" cols="12" v-for="pr in predpriyatiya" :key="pr.n">
            <v-card class="flexcard" height="100%" :to="{path: `/predpriyatiya/${pr.id}`}" elevation="1" >
              <v-img :src="pr.obraz" aspect-ratio="1.5" contain>
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>

              <v-card-title>{{pr.nazvanie}}</v-card-title>
              <v-card-text>{{pr.kratkoe_opisanie}}</v-card-text>

              <v-spacer />

              <v-divider />

              <v-card-actions>
                <b>Место:</b>

                <v-chip v-for="(mesto, nm) in pr.mesto" :key="nm" small>{{mesto}}</v-chip>
              </v-card-actions>
              <v-card-actions>
                <div width="100%">
                  <b>Метки:</b>
                  <v-chip v-for="(metka, nm) in pr.metki" :key="nm" small>{{metka}}</v-chip>
                </div>
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

import { db } from '../db'

export default {
  components: {
    appbar, 

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
</style>
