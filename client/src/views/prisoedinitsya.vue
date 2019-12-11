<template>
  <div class="fill-height">
       <appbar v-on:toggle-drawer="drawer=!drawer">
      <h2>Присоединиться</h2>
      <v-spacer></v-spacer>
    </appbar>
   <v-navigation-drawer 
  width="350px"
  permanent clipped app  >
  <v-list>
       <v-list-item  link to="/">
            <v-list-item-icon>
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Назад</v-list-item-title>
              
            </v-list-item-content>
            
          </v-list-item>
          <v-divider></v-divider>

  </v-list>
  
  </v-navigation-drawer>

 

    <v-content class="fill-height">
      <v-container fluid>
       
      </v-container>
    </v-content>
  </div>
</template>

<script>
import appbar from "../components/appbar.vue";


export default {
  components: {
    appbar,
  
  },
  data: () => ({
    drawer: true,
    
  })
};
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
