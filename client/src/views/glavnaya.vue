<template>
 <span>
   
   
<v-navigation-drawer 
  width="300px" 
  permanent clipped app  >

  <v-list-item>
        <v-list-item-content>

         <v-img src="/svora.png" contain></v-img>
    

        </v-list-item-content>
      </v-list-item>
<v-divider></v-divider>
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

           <v-list-item  link to="/prisoedinitsya">
            <v-list-item-icon>
              <v-icon>mdi-google-circles-group</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Присоединиться</v-list-item-title>
              
            </v-list-item-content>
           
          </v-list-item>
          

        </v-list>
      
    </v-navigation-drawer>


<v-content>
  <v-container  >
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
    <div class="headline font-weight-bold pb-1	">Свора</div>
    <v-card  flat >
     
      <v-card-text class="pb-1 pt-2">
         <div class="title " > Центр поддержки русских национальных предприятий</div>
   <p>
        Здесь собраны сведения о русских национальных предприятиях, о том как их
         можно поддержать и о мероприятиях, которые они проводят.
         <p>
    
   


</p>
</v-card-text>
    </v-card>
      </v-col>

      
    </v-row>
    <div class="headline font-weight-bold	">Сегодняшние события</div>
    <v-row >
      <v-col class="pt-0">
        <span class=" subtitle-1  font-weight-bold">в Cети </span>
        <v-card flat>
     
     
      <v-card-text class="pt-1">
        
       <v-simple-table dense >
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
         <span class=" subtitle-1  font-weight-bold">в Москве</span>
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
           <span class=" subtitle-1  font-weight-bold">в Санкт-Петербурге</span>
        <v-card flat>
     
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
    </v-row>
  
  <div class="headline font-weight-bold	">Поддержать</div>
      <v-row>
     <v-col  class="pt-0">
           <span class=" subtitle-1  font-weight-bold">Дело</span>
        <v-card  flat>
  
     
      <v-card-text class="pt-1">
        
     <v-img :src="sbori[si].obraz" aspect-ratio="1.5" contain>
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>

              <v-card-title class="subtitle-1">{{sbori[si].nazvanie}}</v-card-title>
              <v-card-text>{{sbori[si].kratkoe_opisanie}}</v-card-text>

      
 
</v-card-text>
    </v-card>
      </v-col>
         <v-col  class="pt-0">
           <span class=" subtitle-1  font-weight-bold">Предприятие</span>
        <v-card   flat>
   
      <v-card-text>
       <v-img :src="predpriyatiya[pi].obraz" aspect-ratio="1.5" contain >
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>

              <v-card-title class="subtitle-1">{{predpriyatiya[pi].nazvanie}}</v-card-title>
              <v-card-text>{{predpriyatiya[pi].kratkoe_opisanie}}</v-card-text>
      
</v-card-text>
    </v-card>
      </v-col>

                  <v-col  class="pt-0">
           <span class=" subtitle-1  font-weight-bold">Замысел</span>
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
  firestore: {
    sbori: db.collection('sbori'),
    predpriyatiya: db.collection('predpriyatiya'),
  },
};
</script>
