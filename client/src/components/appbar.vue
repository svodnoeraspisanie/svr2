<template>

  <v-app-bar
    clipped-left
    app
    elevation="1"
    width="300px"
    height="150px"
    class="mainbar"
   
  >


   
<v-list  width="100%">
 

     <v-list-item to="/" class="pa-0 ma-0">
        <v-list-item-content >

         <v-img src="/svora.png" contain width="250px"></v-img>
    

        </v-list-item-content>
      </v-list-item>

<v-divider></v-divider>
<v-toolbar dense class="px-1" elevation="3" >
 
 <v-tooltip bottom>
      <template v-slot:activator="{ on }">
       <v-btn icon to="/statii" v-on="on">
             <v-icon>mdi-book-open</v-icon>
          </v-btn>
      </template>
      <span>Статьи</span>
    </v-tooltip>
      

<v-tooltip bottom>
      <template v-slot:activator="{ on }">
     <v-btn icon to="/predpriyatiya" exact v-on="on">
             <v-icon>mdi-account-group</v-icon>
          </v-btn>
      </template>
      <span>Предприятия</span>
    </v-tooltip>


<v-tooltip bottom>
      <template v-slot:activator="{ on }">
      <v-btn icon  to="/sbori" v-on="on">
            <v-icon>mdi-cash-100</v-icon>
          </v-btn>
      </template>
      <span>Сборы</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon to="/raspisanie" v-on="on">
           <v-icon>mdi-calendar</v-icon>
          </v-btn>
      </template>
      <span>Расписание</span>
    </v-tooltip>

      <v-tooltip bottom>
      <template v-slot:activator="{ on }">
       <v-btn icon  to="/prisoedinitsya" v-on="on">
         <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
      </template>
      <span>Присоединиться</span>
    </v-tooltip>
         
             <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon  to="/spravka" v-on="on">
         <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
      </template>
      <span>Справка</span>
    </v-tooltip>
         
        
           
         
      
    </v-toolbar>
</v-list>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}

 ::v-deep .v-toolbar__content {
 padding: 0px;
}
}

</style>
