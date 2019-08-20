<template>
  <v-app>
  
    <appbar />

  <v-content class="pt-0">
    
      
        <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import appbar from './components/appbar';
import lefttagslist from './components/lefttagslist';

export default {
  name: 'App',
  components: {
    
    appbar,
    lefttagslist,
  },
  data: () => ({
    drawer:true,
    //
  }),
};
</script>
