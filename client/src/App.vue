<template>
  <v-app>
    <appbar/>

    <v-content>
       <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import appbar from './components/appbar';
import lefttagslist from './components/lefttagslist';

export default {
  name: 'App',
  components: {
    HelloWorld,
    appbar,
    lefttagslist,
  },
  data: () => ({
    //
  }),
};
</script>
