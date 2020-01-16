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
        <v-list-item link to="/" >
          <v-list-item-icon>
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Назад</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item link @click="$vuetify.goTo(0);drawer2=false;">
          <v-list-item-icon>
            <v-icon>mdi-lightbulb-on-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Замыслы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$vuetify.goTo('#deyateli',{offset:-150});drawer2=false;">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Деятели</v-list-item-title>
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
        <h2 id="zamisli">
          <v-icon class="mr-2" color="#0a7d9a">mdi-lightbulb-on-outline</v-icon>Замыслы
        </h2>
        <v-row class="ml-1">
          <v-col cols="12" sm="6">
            <v-card outlined class="mb-6">
              <v-card-title
                class="subtitle-1 font-weight-bold"
                style="word-break: normal"
                v-html="zamislitekst.zagolovok"
              ></v-card-title>
              <v-card-text v-html="zamislitekst.tekst"></v-card-text>
            </v-card>
            <v-card outlined>
              <v-card-title class="subtitle-1 font-weight-bold">Список отборных замыслов</v-card-title>
              <v-card-text>
                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(zam,i) in zamisli" :key="i">
                      <td>{{zam.nazvanie}}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSftCUO1HtFoRnSXUYCraKmHCL6ow0BpR2064TxJUb_zWR6L-g/viewform?embedded=true"
              width="100%"
              height="500px"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >Загрузка…</iframe>
          </v-col>
        </v-row>

        <h2 id="deyateli">
          <v-icon class="mr-2" color="#0a7d9a">mdi-account-multiple</v-icon>Деятели
        </h2>
        <v-row class="ml-1">
          <v-col cols="12" sm="6">
            <v-card outlined class="mb-6">
              <v-card-title
                class="subtitle-1 font-weight-bold"
                style="word-break: normal"
                v-html="deyatelitekst.zagolovok"
              ></v-card-title>
              <v-card-text v-html="deyatelitekst.tekst"></v-card-text>
            </v-card>
            <v-card outlined class="mb-6">
              <v-card-title
                class="subtitle-1 font-weight-bold"
                style="word-break: normal"
                v-html="poryadoktekst.zagolovok"
              ></v-card-title>
              <v-card-text v-html="poryadoktekst.tekst"></v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSczQ3M4UVMdbiL5v7dvOIPyE_QzgnZV8GG3jTkAOcAyLOCWSg/viewform?embedded=true"
              width="100%"
              height="627"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >Загрузка…</iframe>
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
  mounted() {

  },
  methods: {},

  created(){
    db.collection("teksti")
        .doc("zamisli")
        .get()
        .then(snapshot => {
          this.zamislitekst = snapshot.data();
        });

        db.collection("teksti")
        .doc("deyateli")
        .get()
        .then(snapshot => {
          this.deyatelitekst = snapshot.data();
        });

         db.collection("teksti")
        .doc("poryadok")
        .get()
        .then(snapshot => {
          this.poryadoktekst = snapshot.data();
        });
  },

 
  data: () => ({
    drawer2: false,
    zamisli: [{ nazvanie: "" }],
    zamislitekst:"",
    deyatelitekst:"",
    poryadoktekst:""

  }),
  firestore: {
    zamisli: db.collection("zamisli"),
   
  }
};
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
