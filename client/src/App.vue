<template>
  <v-app style="background-color:#eef5f8">
   <appbar v-on:toggle-drawer="drawer=!drawer"/>
      <router-view class="fill-height" :drawer="drawer"/>
    
  </v-app>
</template>

<script>
import appbar from './components/appbar.vue';

export default {

  name: 'App',
  components: {

    appbar,


  },
  data: () => ({
    drawer:true,
  }),
};
</script>

<style scoped>
html,
body {
    height: 100%;
}

</style>
