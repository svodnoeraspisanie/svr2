<template>
  <div class="fill-height">

   <v-navigation-drawer 
width="300px" 
  permanent clipped app  >

  <v-list>
       <v-list-item  link to="/" dense>
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

 

    <v-content class="pt-0">
      <v-container fluid>
        <v-menu >
          <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>
      
            
           
          
       <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSftCUO1HtFoRnSXUYCraKmHCL6ow0BpR2064TxJUb_zWR6L-g/viewform?embedded=true" width="640" height="471" frameborder="0" marginheight="0" marginwidth="0">Загрузка…</iframe>
      
        </v-menu>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import appbar from "../components/appbar.vue";
import minitoolbar from "../components/minitoolbar.vue";

export default {
  components: {
    appbar,
  minitoolbar,
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
