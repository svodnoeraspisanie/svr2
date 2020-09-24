<template>
  <v-app style="background-color:#eef5f8" >
    <appbar v-if="!$vuetify.breakpoint.xs" v-on:toggle-drawer="drawer=!drawer" />
    <router-view class="fill-height" :drawer="drawer"  />

    <v-btn v-if="(pokazatStrelku)" fab bottom fixed right @click="$vuetify.goTo(0,{})" color="#0a7d9a" class="ml-2">
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="#fff" d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z"> </path>
                    </svg></v-btn>
    <v-btn
      v-if="$vuetify.breakpoint.xs"
      fab
      fixed
      bottom
      left
      color="#f4c900"
      @click="drawer=!drawer"
    >
      <v-icon>mdi-arrow-expand-right</v-icon>
    </v-btn>
    <v-speed-dial
      v-if="$vuetify.breakpoint.xs"
      v-model="fab"
      fixed
      bottom
      right
      direction="top"
      transition="slide-x-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn color="#f4c900" link fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-img v-else src="/android-chrome-96x96.png" height="46px" contain></v-img>
        </v-btn>
      </template>
      <v-btn fab color="#f4c900" small to="/">
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900" small to="/statii">
        <v-icon>mdi-book-open</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900" small to="/predpriyatiya">
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900" small to="/podpisi">
        <v-icon>mdi-lead-pencil</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900" small to="/sbori">
        <v-icon>mdi-cash-multiple</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900" small to="/sobitiya">
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900" small to="/prisoedinitsya">
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900" small to="/spravka">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-app>
</template>

<script>
import appbar from './components/appbar.vue';

export default {
  name: 'app',
  components: {
    appbar,
  },
  data: () => ({
    drawer: true,
    fab: false,
    he:document.body.offsetHeight,
    pokazatStrelku:true,
  }),
  methods: {
    scrl(){
      console.log('sr')
    }
  },
   watch: {
      $route (to, from) {
        document.title = to.meta.title;

      }
    },
    

};
</script>

<style scoped>
html,
body {
  height: 100%;
}
</style>
