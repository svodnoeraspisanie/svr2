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
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Назад</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        

        
        <v-divider></v-divider>
        <v-list-item
          link
          @click="openlink('https://docs.google.com/forms/d/e/1FAIpQLSfxFwNOOBAIpS3UqMndosaJ_WcxsHhYld_7Af3j_OMsqoYROw/viewform?usp=sf_link');drawer2=false;"
        >
          <v-list-item-icon>
            <v-icon>mdi-database-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Предложить сбор</v-list-item-title>
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
        <h2 @click="poyasnenie=!poyasnenie">
          <v-icon class="mr-2 pb-1" color="#0a7d9a">mdi-lead-pencil</v-icon>
          <span style="border-bottom: 1px dashed gray;">Идущие сборы подписей ({{sbori.length}})</span>
        </h2>
        <v-card outlined class="ml-3 mt-2" v-if="poyasnenie" @click="poyasnenie=!poyasnenie">
          <v-card-text class="pb-1 pt-2" v-html="sbori_teksti.tekst"></v-card-text>
        </v-card>
        <v-row class="ml-0">
<v-col v-if="sbori.length === 0" lg="3" md="4" sm="6" cols="12"  v-for="n in 12" :key="n">
            <v-skeleton-loader
            class="mx-auto"
            
            
            type="card"
    ></v-skeleton-loader>
          </v-col>
          <v-col lg="3" md="4" sm="6" cols="12" v-for="(sbor,i) in sbori" :key="i">
            <v-card class="cardhov" height="100%" outlined @click="openlink(sbor.ssilka)">
              <div style="display: flex;  flex-flow: column;   height:100%">
                <div style="widht:100%; background:#cde6bb; text-align:center">{{extractDomain(sbor.ssilka)}}</div>
                <div>
                  <v-img :src="sbor.obraz" aspect-ratio="1.5" contain>
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="#0a7d9a"></v-progress-circular>
                    </v-layout>
                  </v-img>
                </div>
                <div style="flex:1;">
                  <v-divider />
                  <v-card-title class="subtitle-2" style="word-break: normal">{{sbor.nazvanie}}</v-card-title>
                  <v-card-text>{{sbor.kratkoe_opisanie}}</v-card-text>
                  
                </div>
                
              </div>
            </v-card>
          </v-col>
        </v-row>

        
        
        
      </v-container>
    </v-content>
  </div>
</template>

<script>
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
    poyasnenie: false,
    poyasnenie2: false,
    sbori_teksti: {},
    sboriZavershennie: []
  }),

  firestore() {
    return {
      sbori: this.$firebase.collection("podpisi").orderBy("nazvanie", "asc").where("idet", "==", true),
      sbori_teksti: this.$firebase.collection("teksti").doc("podpisi-poyasnenie")
    };
  },

  methods: {
    openlink(arg) {
      window.open(arg, "_blank");
    },

  extractDomain(url) {
  var domain;
  //find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  }
  else {
    domain = url.split('/')[0];
  }
  
  //find & remove www
  if (domain.indexOf("www.") > -1) { 
    domain = domain.split('www.')[1];
  }
  
  domain = domain.split(':')[0]; //find & remove port number
  domain = domain.split('?')[0]; //find & remove url params

  return domain;
}
  }
};
</script>

<style>
.cardhov:hover {
  background-color: #eeeeee;
}
</style>
