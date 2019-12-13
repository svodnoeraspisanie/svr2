<template>
  <div class="fill-height">

   <v-navigation-drawer 
width="300px" 
  permanent clipped app  >
        <v-list-item to="/">
        <v-list-item-content>

         <v-img src="/svora.png" contain></v-img>
    

        </v-list-item-content>
      </v-list-item>
<v-divider></v-divider>
 <minitoolbar/>
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

 

    <v-content class="fill-height">
      <v-container fluid>
       
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
