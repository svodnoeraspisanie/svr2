<template>
  <div class="fill-height">
    <v-navigation-drawer
      width="300px"
      :permanent="!$vuetify.breakpoint.xs"
      v-model="drawer2"
      clipped
      app
    >
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

      <v-list-item link v-for="(razdel,i) in spravki" :key="i" @click="$vuetify.goTo('#'+razdel.id,{offset:-150});drawer2=false;">
          <v-list-item-icon>
            <v-icon v-text="razdel.obraz"></v-icon>
           
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{razdel.zagolovok}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      <template v-slot:append v-if="$vuetify.breakpoint.xs">
        <v-list>
          <v-divider></v-divider>
          <v-list-item link @click="drawer2=false">
            <v-list-item-icon>
              <v-icon>mdi-arrow-expand-left</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Свернуть</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-content :style="$vuetify.breakpoint.xs? '': 'padding-top:0px'">
      <v-container :class="$vuetify.breakpoint.xs? 'px-2': 'px-6'">
        <v-row justify="center">
          <v-col cols="auto" class="pt-0">
            <div style="max-width:936px" class="pb-3">
              <h2> <v-icon class="mr-2 pb-1" color="#0a7d9a">mdi-help-circle-outline</v-icon>Справка</h2>
            </div>
            <div class="pl-2" v-for="(razdel,i) in spravki" :key="i">
              <h3 class="pb-2" :id="razdel.id"> <v-icon class="mr-2" color="#0a7d9a" v-text="razdel.obraz"></v-icon> {{razdel.zagolovok}}</h3>
            <v-card
              v-for="vopros in razdel.vio"
              :key="vopros.n"
              flat
              
              class="mb-4 ml-2"
              max-width="936px"
            >
              <v-card-title class="subtitle-1 font-weight-bold pb-1 pt-2" 
                style="word-break: normal"> {{vopros.vopros}}</v-card-title>
              <v-card-text class="pb-1 pt-0" v-html="vopros.otvet"></v-card-text>
            </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { db } from "../db";
export default {
  components: {},
  props: ["drawer"],
  watch: {
    drawer() {
      this.drawer2 = !this.drawer2;
     
    }
  },
  data: () => ({
    drawer2: false,
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
