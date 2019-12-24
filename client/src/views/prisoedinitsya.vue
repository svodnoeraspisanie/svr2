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

       <v-list-item  link  @click="$vuetify.goTo(0);" >
              <v-list-item-icon>
              <v-icon>mdi-lightbulb-on-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Замыслы</v-list-item-title>

            </v-list-item-content>

          </v-list-item>
               <v-list-item  link  @click="$vuetify.goTo('#deyateli',{offset:-150});" >
              <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Деятели</v-list-item-title>

            </v-list-item-content>

          </v-list-item>
  </v-list>

  </v-navigation-drawer>


    <v-content class="pt-0">
      <v-container class="px-6">
        <h2 id="zamisli"><v-icon class="mr-2" color="#0a7d9a">mdi-lightbulb-on-outline</v-icon>Замыслы</h2>
        <v-row>
          <v-col  class="ml-2 ">
            <v-card flat class="mb-6">
              <v-card-title class= "subtitle-1 font-weight-bold">
              Свора занимается не только поддержкой уже существующих предприятий, но и помогает создавать новые.
              </v-card-title>
              <v-card-text>

               Что мешает людям заняться делом? <br>
               Обычно они не знают что делать, как делать, не могут собрать команду и наладить взаимодействие. Свора будет помогать проробатывать все эти вопросы.
                И начнём мы со сборы достойных идей, которые стоит воплотить. <br>
                <b> Присылайте ваши замыслы.</b>
              </v-card-text>
            </v-card>
         <v-card flat>
            <v-card-title class= "subtitle-1 font-weight-bold">
              Список отборных замыслов
              </v-card-title>
              <v-card-text>
                <v-simple-table dense>
                  <tbody>
                   <tr v-for="(zam,i) in zamisli" :key="i">
                       <td>{{zam.nazvanie}}</td>
                     </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
<v-col>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSftCUO1HtFoRnSXUYCraKmHCL6ow0BpR2064TxJUb_zWR6L-g/viewform?embedded=true" width="100%" height="500px" frameborder="0" marginheight="0" marginwidth="0">Загрузка…</iframe>
</v-col>
        </v-row>


         <h2 id="deyateli"><v-icon class="mr-2" color="#0a7d9a">mdi-account-multiple</v-icon>Деятели</h2>
        <v-row>
          <v-col class="ml-2 ">
            <v-card flat class="mb-6">
              <v-card-title class= "subtitle-1 font-weight-bold">
              Каким бы хорошим ни был замысел, без людей, которые его воплотят, это всего лишь слова.
              </v-card-title>
              <v-card-text>

               Если вы не можете сидеть сложа руки, чувствуете внутреннюю потребность действовать, хотите воплотить свой замысел или присоединиться к другому начинанию, то пишите нам. <br>


              </v-card-text>
            </v-card>
     <v-card flat class="mb-6">
              <v-card-title class= "subtitle-1 font-weight-bold">
              Что дальше?
              </v-card-title>
              <v-card-text>
                <b>Порядок наших действий:</b>
                <ul>
                  <li>Собрать достойные воплощения замыслы.</li>
                  <li>Собрать людей, которые готовы ими заниматься.</li>
                  <li>Обучить их навыкам плодотворного взаимодействия.</li>
                  <li>Создать предприятия, занимающееся воплощением определёных замыслов.</li>
                  <li>Поддерживать и продвигать данные предприятия.</li>

                </ul>

              </v-card-text>
            </v-card>

          </v-col>
<v-col >
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSczQ3M4UVMdbiL5v7dvOIPyE_QzgnZV8GG3jTkAOcAyLOCWSg/viewform?embedded=true" width="100%" height="627" frameborder="0" marginheight="0" marginwidth="0">Загрузка…</iframe>
</v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>


import { db } from '../db';

export default {
  components: {


  },
  data: () => ({
    drawer: true,
    zamisli: [{ nazvanie: '' }],

  }),
  firestore: {

    zamisli: db.collection('zamisli'),
  },
};
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
