<template>
 <span>
   
   
<v-navigation-drawer 
  width="300px" 
  permanent clipped app  
  
 >

  <v-list-item >
        <v-list-item-content >

         <v-img src="/svora.png" contain ></v-img>
    

        </v-list-item-content>
      </v-list-item>
<v-divider ></v-divider>
      <v-list  class="my-0 py-0">

                  
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
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Предприятия</v-list-item-title>
              
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

           <v-list-item  link to="/prisoedinitsya">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Присоединиться</v-list-item-title>
              
            </v-list-item-content>
           
          </v-list-item>
           <v-list-item  link to="/spravka">
            <v-list-item-icon>
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Ответы на вопросы</v-list-item-title>
              
            </v-list-item-content>
           
          </v-list-item>
          

        </v-list>
      
    </v-navigation-drawer>


<v-content >
  <v-container class="px-6" >
    <v-row >
       <v-col class="pt-0">
         <div class="headline font-weight-bold pb-1	">Новости</div>
          <v-card  flat >
     
      <v-card-text class="pb-1 pt-2">
          <v-simple-table dense>
         <tbody>
           <tr > 
             <td valign="top"> 13.12.19</td>
             <td>Статья о чём-то хорошем </td>
           </tr>
           <tr > 
             <td valign="top"> 12.12.19</td>
             <td>Добавлено предриятие "Чёрная Сотня" </td>
           </tr>
         </tbody>
      </v-simple-table>
</v-card-text>
    </v-card>
       </v-col>
      <v-col class="pt-0">
    <div class="headline font-weight-bold pb-1	"> <router-link class="mainlink" to="/spravka">Что такое Свора?</router-link> </div>
    <v-card  flat >
     
      <v-card-text class="pb-1 pt-2">
         <b>Свора - это центр поддержки русских национальных предприятий.</b>
         <br>
   <p>
        Здесь собраны сведения о русских национальных предприятиях, о том как их
         можно поддержать и о мероприятиях, которые они проводят.
        
    
   


</p>
</v-card-text>
    </v-card>
      </v-col>

      
    </v-row>
    <div class="headline font-weight-bold	"> <router-link to="/raspisanie" class="mainlink">Сегодняшние события</router-link></div>
    <v-row >
      <v-col class="pt-0">
        <span class=" subtitle-1  font-weight-bold"> <router-link to="/raspisanie" class="mainlink">в Cети</router-link> </span>
        <v-card flat>
     
     
      <v-card-text >
        
       <v-simple-table dense >
         <tbody>
           <tr > 
             <td valign="top"> 20:00</td>
             <td>ДЕГ: Стрим#11 "Дмитрий Евгеньевич: литератору — ура!" </td>
           </tr>
           <tr > 
             <td valign="top"> 21:00</td>
             <td>Экономика России в нулевые </td>
           </tr>
         </tbody>
      </v-simple-table>
      
 
</v-card-text>
    </v-card>
      </v-col>
        <v-col  class="pt-0">
         <span class=" subtitle-1  font-weight-bold"><router-link to="/raspisanie" class="mainlink">в Москве</router-link></span>
        <v-card   flat>
      
      <v-card-text>
      <v-simple-table dense>
         <tbody>
           <tr > 
             <td valign="top"> 12:00</td>
             <td>Доклад об эксперименте по электронному голосованию на выборах в МГД-2019 </td>
           </tr>
           <tr > 
             <td valign="top"> 19:00</td>
             <td>Шестая лекция «Крестный путь Василия Розанова» </td>
           </tr>
         </tbody>
      </v-simple-table>
      
</v-card-text>
    </v-card>
      </v-col>
        <v-col  class="pt-0">
           <span class=" subtitle-1  font-weight-bold"><router-link to="/raspisanie" class="mainlink">в Санкт-Петербурге</router-link></span>
        <v-card flat>
     
      <v-card-text>
     <v-simple-table dense>
         <tbody>
           <tr > 
             <td valign="top"> 19:00</td>
             <td>Михаил Виряскин и Борис Гидаспов: "Правосудие от товарища майора" </td>
           </tr>
           <tr > 
             <td valign="top"> 21:00</td>
             <td>Встреча с Матвеем Цзеном </td>
           </tr>
         </tbody>
      </v-simple-table>
</v-card-text>
    </v-card>

      </v-col>
    </v-row>
  
  <div class="headline font-weight-bold	">Поддержать</div>
      <v-row>
     <v-col  class="pt-0">
     
           <span class=" subtitle-1  font-weight-bold"><router-link  to="/sbori" class="mainlink">Дело</router-link></span>
  
        <v-card  flat  >
             <v-btn
                 
                  color="#0a7d9a"
                  fab
                  dark
                  small
                  absolute
                  top
                  right
                
                  @click="si=anyel(si,sbori)" 
                  style="margin-top:5px;margin-right:-24px"
                >
                  <v-icon>mdi-shuffle-variant</v-icon>
                </v-btn>
    
      <v-card-text  class="cardhov" @click="openlink(sbori[si].ssilka)">
        
     <v-img :src="sbori[si].obraz" aspect-ratio="1.5" contain>
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>

              <v-card-title >{{sbori[si].nazvanie}}</v-card-title>
              <v-card-text>{{sbori[si].kratkoe_opisanie}}</v-card-text>

      
 
</v-card-text>
  
    </v-card>
      </v-col>
         <v-col  class="pt-0">
           <span class=" subtitle-1  font-weight-bold"><router-link to="/predpriyatiya" class="mainlink">Предприятие</router-link></span>
           

        <v-card   flat >
    <v-btn
                 
                  color="#0a7d9a"
                  fab
                  dark
                  small
                  absolute
                  top
                  right
                 
                  
                  style="margin-top:5px;margin-right:-24px"
                  @click="pi=anyel(pi,predpriyatiya)" 
                >
                  <v-icon>mdi-shuffle-variant</v-icon>
                </v-btn>
    <router-link class="cardlink"  :to="{path: `/predpriyatiya/${predpriyatiya[pi].id}`}" >
      <v-card-text class="cardhov">
       <v-img :src="predpriyatiya[pi].obraz" eager aspect-ratio="1.5" contain >
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>

              <v-card-title >{{predpriyatiya[pi].nazvanie}}</v-card-title>
              <v-card-text>{{predpriyatiya[pi].kratkoe_opisanie}}</v-card-text>
      
</v-card-text>
    </router-link>
    </v-card>
      </v-col>

                  <v-col  class="pt-0">
           <span class=" subtitle-1  font-weight-bold"><router-link to="/prisoedinitsya" class="mainlink">Замысел</router-link></span>
        <v-card   flat>
          <v-card-text>
   <v-simple-table dense>
         <tbody>
           <tr > 
           
             <td>Сделать нашим хорошо </td>
           </tr>
           <tr > 
            
             <td>А чужим сделать плохо </td>
           </tr>
         </tbody>
      </v-simple-table>
 
      
      
</v-card-text>

    </v-card>
  
      </v-col>

    </v-row>

  </v-container>
</v-content>
 </span>
</template>

<script>

import appbar from '../components/appbar.vue';
import { db } from '../db'

export default {
  components: {

    appbar,


  },

  data: () => ({
    drawer: true,
    sbori:[],
    predpriyatiya:[],
    si:0,
    pi:0,


  }),
  methods:{
    openlink(arg) {
      window.open(arg, '_blank')
    },
    anyel(i,ar){

      let i2 =~~(Math.random() * ar.length); 
     
      return (i==i2 ? (i==ar.length-1?i-1:i+1) : i2);
    }
  },
  firestore: {
    sbori: db.collection('sbori'),
    predpriyatiya: db.collection('predpriyatiya'),
  },
};
</script>
<style scoped>
.mainlink {
 text-decoration: none;
 color:#1f2020!important;
}
.mainlink:hover {
 text-decoration: underline;
 color:#1f2020!important;
}
.cardlink {
 text-decoration: none;
 color:#1f2020!important;
}
.cardlink:hover {
 text-decoration: none;
 color:#1f2020!important;
}
.cardhov:hover{

  background-color:#eeeeee;
}
</style>
