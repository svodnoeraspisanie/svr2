<template>
  <div class="fill-height">
    <v-navigation-drawer
      :permanent="!$vuetify.breakpoint.xs"
      v-model="drawer2"
      app
      clipped
      width="300px"
    >
      <v-list>
        <v-list-item link to="/predpriyatiya" exact dense>
          <v-list-item-icon>
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Список предприятий</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link @click="$vuetify.goTo(0);drawer2=false;">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>Кто мы?</v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$vuetify.goTo('#chtomidelaem',offset);drawer2=false;;">
          <v-list-item-icon>
            <v-icon>mdi-trending-up</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Что мы делаем?</v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$vuetify.goTo('#kakpoddergat',offset);drawer2=false;">
          <v-list-item-icon>
            <v-icon>mdi-cash-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Как нас поддержать?</v-list-item-content>
        </v-list-item>

        <v-list-item link @click="$vuetify.goTo('#ssilki',offset);drawer2=false;">
          <v-list-item-icon>

            <v-icon>mdi-web</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Наши страницы в сети</v-list-item-content>
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
          <v-col cols="auto">
            <v-card class="mb-4 pb-2" flat max-width="936px">
              <v-row>
                <v-col cols="12" sm="3">
                  <v-img :src="pr.obraz" aspect-ratio="1.5" max-width="500px" contain>
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
                    </v-layout>
                  </v-img>
                </v-col>
                <v-col cols="12" sm="9" class="pb-0">
                  <v-card-title>{{pr.nazvanie}}</v-card-title>
                  <v-card-text>{{pr.kratkoe_opisanie}}</v-card-text>
                  <v-card-text class="py-0">
                  <v-btn  class="mr-1 mb-1" depressed color="#f4c900"
             v-for="(ssilka,servis) in pr.ssilki" :key="servis" :href="ssilka" >
                                      {{servis}}
                  </v-btn>
                </v-card-text>
                </v-col>
              </v-row>
              
            </v-card>

            <v-card class="mb-4" flat max-width="936px" id="chtomidelaem">
              <v-card-title>Что мы делаем?</v-card-title>
              <v-card-text v-html="pr.podrobnoe_opisanie"></v-card-text>
            </v-card>

            <v-card class="mb-4" flat id="kakpoddergat">
              <v-card-title>Как нас поддержать?</v-card-title>
              <v-card-text>
                <ul v-for="(schet,gate) in pr.scheta" :key="gate">
                  <li>
                    <b>{{gate}}</b>:
                    <a v-if="schet.slice(0,5)=='https'" :href="schet">{{schet}}</a>
                    <span v-else>{{schet}}</span>
                  </li>
                </ul>
              </v-card-text>
            </v-card>

            <v-card flat max-width="936px" id="ssilki">
              <v-card-title>Наши страницы в сети</v-card-title>
              <v-card-text>
                <ul v-for="(ssilka,servis) in pr.ssilki" :key="servis">
                  <li>
                    <a v-bind:href="ssilka">{{servis}}</a>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { db,st } from "../db";

export default {
  components: {},

  props: ["drawer"],

  computed: {
  
  },
  data: () => ({
    drawer2: false,

    pr: {obraz:""}
  }),
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
    drawer() {
      this.drawer2 = !this.drawer2;
      
    }
  },
  methods: {
    fetchData() {
      const vm = this;

      db.collection("predpriyatiya")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          let res = snapshot.data();
          

           st.ref()
            .child(res.obraz)
            .getDownloadURL()
            .then(function onSuccess(url) {
              res.obraz = url;
              vm.pr =res;
            })
            .catch(function onError(err) {
              console.log("Error occured..." + err);
            });



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
