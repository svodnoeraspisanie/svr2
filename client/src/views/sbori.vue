<template>
  <div class="fill-height">

   <v-navigation-drawer 
 
  permanent clipped app  >
        <v-list-item to="/">
        <v-list-item-content>

         <v-img src="/svora.png" contain></v-img>
    

        </v-list-item-content>
      </v-list-item>
<v-divider></v-divider>
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

 

    <v-content>
      <v-container >
       <h2>Сборы средств</h2>
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
