<template>
  <v-app style="background-color:#eef5f8">
   <appbar />
      <router-view />
    
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
    //
  }),
};
</script>

<style scoped>
html, 
body {
    height: 100%;
}

</style>
