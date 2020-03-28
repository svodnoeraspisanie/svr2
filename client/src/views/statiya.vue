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
        <v-list-item link to="/statii">
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
        <v-row justify="center">
          <v-col cols="auto" class="pt-0">
            <div style="max-width:936px" class="pb-3">
              <h2>
                <v-icon class="mr-2 pb-1" color="#0a7d9a">mdi-book-open</v-icon>Статьи
              </h2>
            </div>
            <v-card outlined class="mb-6 ml-2" max-width="936px">
              <v-card-title style="word-break: normal">{{statiya.nazvanie}}</v-card-title>
              <v-card-text v-html="statiya.text"></v-card-text>
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
data: () => ({
    drawer2: false,
    statiya: {}
  }),
  watch: {
    drawer() {
      this.drawer2 = !this.drawer2;
    },
    statiya() {
      document.title=this.statiya.nazvanie+' | Свора';
    }
  },
  
  firestore() {
    return {
      statiya: this.$firebase.collection("statii").doc(this.$route.params.id)
    };
  }
};
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
