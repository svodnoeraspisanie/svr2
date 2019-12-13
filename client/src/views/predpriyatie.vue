<template>
  <div class="fill-height">


    <v-navigation-drawer permanent clipped app width="300px"   >
         <v-list-item to="/">
        <v-list-item-content>

         <v-img src="/svora.png" contain></v-img>
    

        </v-list-item-content>
      </v-list-item>
<v-divider></v-divider>
<minitoolbar/>
        <v-list>

            <v-list-item  link to="/predpriyatiya" exact dense>
            <v-list-item-icon>
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Назад</v-list-item-title>
              
            </v-list-item-content>
            
          </v-list-item>
<v-divider></v-divider>

          <v-list-item link >
            <v-list-item-content>
              Что мы делаем?
            </v-list-item-content>
          </v-list-item>
           <v-list-item link >
            <v-list-item-content>
              Как нас поддеражть?
            </v-list-item-content>
          </v-list-item>
      

          <v-list-item>
           
          </v-list-item>
          <v-divider></v-divider>
        </v-list>

</v-navigation-drawer>

    <v-content>
          <v-container fluid >
     <v-row justify="center">
    <v-col cols="auto">

         <v-card class="mb-4" flat max-width="936px" >
        <v-row>
          <v-col cols="3">
<v-img :src="pr.obraz" aspect-ratio="1.5" max-width="500px" contain>
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
          </v-col>
          <v-col cols="9">
             <v-card-title>{{pr.nazvanie}}</v-card-title>
              <v-card-text>{{pr.kratkoe_opisanie}}</v-card-text>
          </v-col>
        </v-row>
           </v-card>

       
       

    
        <v-card class="mb-4" max-width="936px" flat>
          <v-card-title>Что мы делаем?</v-card-title>
          <v-card-text v-html="pr.podrobnoe_opisanie"></v-card-text>
        </v-card>

        <v-card class="mb-4" max-width="936px" flat>
          <v-card-title>Как нас поддержать?</v-card-title>
          <v-card-text>
            <ul v-for="(schet,gate) in pr.scheta">
              <li>{{gate}}: {{schet}}</li>
            </ul>
          </v-card-text>
        </v-card>

        <v-card max-width="936px" flat>
          <v-card-title>Наши страницы в сети</v-card-title>
          <v-card-text>
            <ul v-for="(ssilka,servis) in pr.ssilki">
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
import appbar from "../components/appbar.vue";
import minitoolbar from "../components/minitoolbar.vue";
import { db } from "../db";


export default {
  components: {
    appbar,
 minitoolbar,
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
