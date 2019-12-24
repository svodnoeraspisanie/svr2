<template>
  <div class="fill-height">
<v-navigation-drawer permanent  app  clipped width="300px" >

        <v-list >

            <v-list-item  link to="/predpriyatiya" exact dense>
            <v-list-item-icon>
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Список предприятий</v-list-item-title>
              
            </v-list-item-content>
            
          </v-list-item>
<v-divider></v-divider>
<v-list-item link @click="$vuetify.goTo(0);" >
  <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

            <v-list-item-content  >
              Кто мы?
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="$vuetify.goTo('#chtomidelaem',{offset:-150});" >
             <v-list-item-icon>
            <v-icon>mdi-trending-up</v-icon>
          </v-list-item-icon>
            <v-list-item-content  >
              Что мы делаем?
            </v-list-item-content>
          </v-list-item>
           <v-list-item link @click="$vuetify.goTo('#kakpoddergat',{offset:-150});">
              <v-list-item-icon>
            <v-icon>mdi-cash-multiple</v-icon>
          </v-list-item-icon>
            <v-list-item-content>
              Как нас поддержать?

            </v-list-item-content>
   </v-list-item>

             <v-list-item link @click="$vuetify.goTo('#stranici',{offset:-150});">
              <v-list-item-icon>
            <v-icon>mdi-web</v-icon>
          </v-list-item-icon>
            <v-list-item-content>
              Наши страницы в сети
            </v-list-item-content>
          </v-list-item>
      

       
           
        </v-list>

</v-navigation-drawer>

    <v-content >
          <v-container  class="px-6"  >
     <v-row justify="center">
    <v-col cols="auto" >

         <v-card class="mb-4" flat  max-width="936px" >
        <v-row >
          <v-col cols="3">
<v-img :src="pr.obraz" aspect-ratio="1.5" max-width="500px" contain>
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
          </v-col>
          <v-col cols="9" class="pb-0">
             <v-card-title>{{pr.nazvanie}}</v-card-title>
              <v-card-text>{{pr.kratkoe_opisanie}}</v-card-text>
         
          </v-col>
        </v-row>
           
           </v-card>

       
       

    
        <v-card class="mb-4"  flat  max-width="936px"  id="chtomidelaem">
          <v-card-title>Что мы делаем?</v-card-title>
          <v-card-text v-html="pr.podrobnoe_opisanie"></v-card-text>
        </v-card>

        <v-card class="mb-4" flat id="kakpoddergat" >
          <v-card-title>Как нас поддержать?</v-card-title>
          <v-card-text>
            <ul v-for="(schet,gate) in pr.scheta" :key="gate">
              <li><b>{{gate}}</b>:  <a v-if="schet.slice(0,5)=='https'" :href="schet">{{schet}}</a>  <span v-else>{{schet}}</span>
          </li>
            </ul>
          </v-card-text>
        </v-card>

        <v-card flat  max-width="936px" id="stranici">
          <v-card-title>Наши страницы в сети</v-card-title>
          <v-card-text>
            <ul v-for="(ssilka,servis) in pr.ssilki" :key="servis">
              <li>
                <a v-bind:href="ssilka">{{servis}}</a>
              </li>
            </ul>
          </v-card-text>
        </v-card>
       </v-col></v-row>
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

    pr: null
  }),
  created() {
    this.fetchData();
  },
  watch: {
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
