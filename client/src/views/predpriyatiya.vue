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
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Назад</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link @click="openlink('https://forms.gle/i3WgnfFHsQzbnXocA');drawer2=false;">
          <v-list-item-icon>
            <v-icon>mdi-database-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Предложить предприятие</v-list-item-title>
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
        <h2 @click="poyasnenie=!poyasnenie;">
          <v-icon class="mr-2 pb-1" color="#0a7d9a">mdi-account-group</v-icon>
          <span style="border-bottom: 1px dashed gray;">Русские национальные предприятия</span>
        </h2>
        <v-card outlined class="ml-3 mt-2" v-if="poyasnenie" @click="poyasnenie=!poyasnenie">
          <v-card-text class="pb-1 pt-2" v-html="poyasnenie_tekst"></v-card-text>
        </v-card>

        <v-row class="ml-0">
          <v-col lg="3" md="4" sm="6" cols="12" v-for="pr in predpriyatiya" :key="pr.n">
            <v-card class="cardhov" height="100%" :to="{path: `/predpriyatiya/${pr.id}`}" outlined>
              <div style="display: flex;  flex-flow: column;   height:100%">
                <div>
                  <v-img :src="pr.obraz" aspect-ratio="1" contain style="width:100%">
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="#0a7d9a"></v-progress-circular>
                    </v-layout>
                  </v-img>
                  <v-divider />
                </div>
                <div style="flex:1;">
                  <v-card-title
                    class="subtitle-1 font-weight-bold"
                    style="word-break: normal"
                  >{{pr.nazvanie}}</v-card-title>
                  <v-card-text>{{pr.kratkoe_opisanie}}</v-card-text>
                </div>
                <div>
                  <v-divider />

                  <v-card-text class="pa-2">
                    <div>
                      Место:
                      <v-chip
                        v-for="(mesto, nm) in pr.mesto"
                        :key="nm"
                        small
                        style="height:18px; margin-left:2px;"
                      >{{mesto}}</v-chip>
                    </div>

                    <div>
                      Метки:
                      <v-chip
                        v-for="(metka, nm) in pr.metki"
                        :key="nm"
                        small
                        style="height:18px; margin-left:2px"
                      >{{metka}}</v-chip>
                    </div>
                  </v-card-text>
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
import { db, st } from '../db';

export default {
  components: {},
  props: ['drawer'],

  watch: {
    drawer() {
      this.drawer2 = !this.drawer2;
    },
  },
  data: () => ({
    drawer2: false,
    predpriyatiya: [],
    poyasnenie: false,
    poyasnenie_tekst: '',
  }),

  created() {
    const vm = this;

    db.collection('teksti')
      .doc('predpiyatiya-poyasnenie')
      .get()
      .then((snapshot) => {
        this.poyasnenie_tekst = snapshot.data().tekst;
      });

    db.collection('predpriyatiya')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const res = doc.data();
          res.id = doc.id;

          st.ref()
            .child(res.obraz)
            .getDownloadURL()
            .then((url) => {
              res.obraz = url;
              vm.predpriyatiya.push(res);
            })
            .catch((err) => {
              console.log(`Error occured...${err}`);
            });
        });
      });
  },
  methods: {
    openlink(arg) {
      window.open(arg, '_blank');
    },
  },
};
</script>

<style>
.cardhov:hover {
  background-color: #eeeeee;
}
</style>
