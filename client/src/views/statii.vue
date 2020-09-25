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
        <h2>
          <v-icon class="mr-2 pb-1" color="#0a7d9a">mdi-book-open</v-icon>Статьи
        </h2>

        <v-row class="ml-0">
          <v-col v-if="statii.length === 0" lg="4" md="4" sm="6" cols="12"  v-for="n in 12" :key="n">
            <v-skeleton-loader
            class="mx-auto"
            
            
            type="card"
    ></v-skeleton-loader>
          </v-col>
          <v-col lg="4" md="6" sm="12" cols="12" v-for="(statia,i) in statii" :key="i">
            <v-card class="cardhov" height="100%" outlined :to="{path: `/statii/${statia.id}`}">
              <v-img :src="statia.obraz" aspect-ratio="1.5" contain style="width:100%">
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="#0a7d9a"></v-progress-circular>
                </v-layout>
              </v-img>
              <v-divider />
              <v-card-title style="word-break: normal">{{statia.nazvanie}}</v-card-title>
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
    statii: []
  }),

  firestore() {
    return {
      statii: this.$firebase.collection("statii").orderBy("pokazano", "desc")
    };
  }
};
</script>

<style>
.cardhov:hover {
  background-color: #eeeeee;
}
</style>
