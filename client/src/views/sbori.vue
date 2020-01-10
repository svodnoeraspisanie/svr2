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
      <v-container class="px-6">
        <h2 @click="poyasnenie=!poyasnenie">
          <v-icon class="mr-2 pb-1" color="#0a7d9a">mdi-cash-multiple</v-icon><span style="border-bottom: 1px dashed gray;" >Сборы средств</span>
        </h2>
<v-card flat class="ml-3 mt-2" v-if="poyasnenie" @click="poyasnenie=!poyasnenie">
              <v-card-text class="pb-1 pt-2" v-html="sbori_tekst">
              
              </v-card-text>
            </v-card>
        <v-row class="ml-0">
          <v-col lg="3" md="4" sm="6" cols="12" v-for="(sbor,i) in sbori" :key="i">
            <v-card
              class="flexcard cardhov"
              height="100%"
              elevate="0"
              flat
              @click="openlink(sbor.ssilka)"
            >
              <v-img :src="sbor.obraz" aspect-ratio="1.5" contain class="ma-2">
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="#0a7d9a"></v-progress-circular>
                </v-layout>
              </v-img>

              <v-card-title class="subtitle-2" style="word-break: normal">{{sbor.nazvanie}}</v-card-title>
              <v-card-text>{{sbor.kratkoe_opisanie}}</v-card-text>

              <v-spacer />
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
  components: {},
  props: ["drawer"],

  watch: {
    drawer() {
      this.drawer2 = !this.drawer2;
     
    }
  },
  data: () => ({
    drawer2: false,
    sbori: [],
    poyasnenie:false,
    bori_tekst:""
  }),
   created(){
    db.collection("teksti")
        .doc("sbori-poyasnenie")
        .get()
        .then(snapshot => {
          this.sbori_tekst = snapshot.data().tekst;
        });
  },
  firestore: {
    sbori: db.collection("sbori")
  },
  methods: {
    openlink(arg) {
      window.open(arg, "_blank");
    }
  }
};
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
.cardhov:hover {
  background-color: #eeeeee;
}
</style>
