<template>
 <div class="fill-height">
   
   <appbar v-on:toggle-drawer="drawer=!drawer" >
   
    
   </appbar>
<v-navigation-drawer 
  width="350px"
  permanent clipped app  >
      <v-list  >
         
          <v-list-item  link to="/statii">
            <v-list-item-icon>
              <v-icon>mdi-book-open</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Статьи</v-list-item-title>
              
            </v-list-item-content>
           
          </v-list-item>
           <v-list-item  link to="/predpriyatiya">
            <v-list-item-icon>
              <v-icon>mdi-account-badge-horizontal-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Список предприятий</v-list-item-title>
              
            </v-list-item-content>
           
          </v-list-item>

           <v-list-item  link to="/sbori">
            <v-list-item-icon>
              <v-icon>mdi-cash-100</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Сборы средств</v-list-item-title>
              
            </v-list-item-content>
           
          </v-list-item>

           <v-list-item  link to="/raspisanie">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Расписание событий</v-list-item-title>
              
            </v-list-item-content>
           
          </v-list-item>
          

        </v-list>
      
    </v-navigation-drawer>


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


export default {
  components: {

    appbar,


  },

  data: () => ({
    drawer: true,
  }),
};
</script>
