<template>
 <div class="fill-height">
   
   <appbar v-on:toggle-drawer="drawer=!drawer" >
   
    
   </appbar>
<sidemenu></sidemenu>
<v-content class="fill-height">
      <v-container
      
     
        
      >
    <v-card>
      <v-card-title>Добро пожаловать</v-card-title>
      <v-card-text><p>Свора - это центр поддержки русских национальных предприятий.
      <p>
      <b>Предприятие</b> - это то, что предпринимают люди.
      Этим словом здесь обозначается любое дело, начинание, продукт или проект.
      <p>
        <b>Национальное предприятие</b> -
        это предприятие нацеленное на решение проблем стоящих перед нацией и её
         представителями или служащее их развитию.
      <p>
        Здесь собраны сведения о русских национальных предприятиях, о том как их
         можно поддержать и о мероприятиях, которые они проводят.


</p>
</v-card-text>
    </v-card>

      </v-container>
</v-content>
 </div>
</template>

<script>

import appbar from '../components/appbar.vue';
import sidemenu from '../components/sidemenu.vue';

export default {
  components: {

    appbar,
    sidemenu,

  },

  data: () => ({
    drawer: true,
  }),
};
</script>
