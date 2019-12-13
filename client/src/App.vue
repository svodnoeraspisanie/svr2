<template>
  <v-app style="background-color:#eef5f8">
   
      <router-view />
    
  </v-app>
</template>

<script>
export default {
  name: 'App',

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
