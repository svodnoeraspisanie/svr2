<template>
  <v-app style="background-color:#eef5f8">
    <appbar v-if="!$vuetify.breakpoint.xs" v-on:toggle-drawer="drawer=!drawer" />
    <router-view class="fill-height" :drawer="drawer" />

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
          <v-icon v-else>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-btn fab color="#f4c900"  small to="/">
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900"  small to="/statii">
        <v-icon>mdi-book-open</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900"  small to="/predpriyatiya">
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900"  small to="/sbori">
        <v-icon>mdi-cash-multiple</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900"  small to="/sobitiya">
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900"  small to="/prisoedinitsya">
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
      <v-btn fab color="#f4c900"  small to="/spravka">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-app>
</template>

<script>
import appbar from "./components/appbar.vue";

export default {
  name: "App",
  components: {
    appbar
  },
  data: () => ({
    drawer: true,
    fab: false
  })
};
</script>

<style scoped>
html,
body {
  height: 100%;
}
</style>
