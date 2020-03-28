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
        <v-divider></v-divider>
        <div class="pt-2 pl-4 subtitle-1 font-weight-bold	" >Выберите метки:</div>
        <v-list class="pt-0 pl-4">
          <template v-for="(item, i) in pokazannie_metki">
            <v-list-item  style="min-height: 24px;" small :key="i" @click="vibrannie_metki.push(item)">
              <v-list-item-title v-text="item[0]"></v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
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
          <span
            style="border-bottom: 1px dashed gray;"
          >Русские национальные предприятия ({{pokazannie_redpriyatiya.length}})</span>
        </h2>
        <v-card outlined class="ml-3 mt-2" v-if="poyasnenie" @click="poyasnenie=!poyasnenie">
          <v-card-text class="pb-1 pt-2" v-html="poyasnenie_tekst.tekst"></v-card-text>
        </v-card>
        <v-chip
          v-for="(metka,i) in vibrannie_metki"
          :key="i"
         class="mt-1 mr-1"
         
          @click="vibrannie_metki.splice(i,1)"
        >{{metka[0]}}</v-chip>
        <v-row class="ml-0">
          <v-col lg="3" md="4" sm="6" cols="12" v-for="(pr,i) in pokazannie_redpriyatiya" :key="i">
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
export default {
  components: {},
  props: ["drawer"],

  watch: {
       vsepredpriyatiya() {
      this.pokazannie_redpriyatiya=this.vsepredpriyatiya.slice();
      this.obnovitSpiski();
      console.log("obnovit");

    },
    drawer() {
      this.drawer2 = !this.drawer2;
    },
    pokazannie_redpriyatiya() {
      this.obnovitSpiski();
    },
    vibrannie_metki() {
      this.pokazannie_redpriyatiya = [];

      for (let i = 0; i < this.vsepredpriyatiya.length; ++i) {
        let pr = this.vsepredpriyatiya[i];
        let podhodit = 0;
        for (let j = 0; j < this.vibrannie_metki.length; ++j) {
          let metka = this.vibrannie_metki[j];

          if (pr.metki.indexOf(metka[0]) > -1) {
            podhodit = podhodit + 1;
          }
        }
        if (this.vibrannie_metki.length == podhodit) {
          this.pokazannie_redpriyatiya.push(pr);
        }
      }
    }
  },
  data: () => ({
    drawer2: false,
    vsepredpriyatiya: [],
    pokazannie_redpriyatiya: [],
    pokazannie_metki: [],
    vibrannie_metki: [],
    poyasnenie: false,
    poyasnenie_tekst: "",
    zagruzheniobrazy: false
  }),
firestore() {
    return {
    vsepredpriyatiya: this.$firebase.collection("predpriyatiya").orderBy("nazvanie"),
    poyasnenie_tekst:this.$firebase.collection("teksti").doc("predpiyatiya-poyasnenie"),
    }
  },

  methods: {
    obnovitSpiski() {
      
      let vm = this;
      let vse_metki = [];

      for (let i = 0; i < vm.pokazannie_redpriyatiya.length; ++i) {
        vse_metki = vse_metki.concat(vm.pokazannie_redpriyatiya[i].metki);
      }

      let counterMap = vse_metki.reduce(function(sameMap, item) {
        if (!sameMap[item]) {
          sameMap[item] = 1;
        } else {
          sameMap[item]++;
        }

        return sameMap;
      }, {});

      let result = Object.keys(counterMap).map(function(key) {
        return [key, counterMap[key]];
      });

      result.sort(function(a, b) {
        if (a[1] < b[1]) {
          return 1;
        }
        if (a[1] > b[1]) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });

      vm.pokazannie_metki = result;

      for (let i = 0; i < vm.vibrannie_metki.length; ++i) {
        for (let j = 0; j < vm.pokazannie_metki.length; ++j) {
          if (vm.vibrannie_metki[i][0] === vm.pokazannie_metki[j][0]) {
            vm.pokazannie_metki.splice(j, 1);
            break;
          }
        }
      }
    },
    openlink(arg) {
      window.open(arg, "_blank");
    }
  }
};
</script>

<style>
.cardhov:hover {
  background-color: #eeeeee;
}
</style>
