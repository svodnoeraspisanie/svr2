<template>
  <div class="fill-height">
    <v-navigation-drawer
      width="300px"
      :permanent="!$vuetify.breakpoint.xs"
      v-model="drawer2"
      clipped
      app
    >
      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Назад</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <template v-slot:append v-if="$vuetify.breakpoint.xs">
        <v-list>
          <v-divider></v-divider>
          <v-list-item link @click="drawer2=false">
            <v-list-item-icon>
              <v-icon>mdi-arrow-expand-left</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Свернуть</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-content :style="$vuetify.breakpoint.xs? '': 'padding-top:0px'">
      <v-container :class="$vuetify.breakpoint.xs? 'px-2': 'px-6'">
        <h2 @click="poyasnenie=!poyasnenie;">
         
          <v-img max-height="24px" max-width="24px" class="d-inline-block mr-2 pb-1"  src="https://firebasestorage.googleapis.com/v0/b/svora-6f3df.appspot.com/o/rc.png?alt=media&token=d78085f4-bf3b-4cee-a0f0-5c192ffaa17a"></v-img>
          <span
            style="border-bottom: 1px dashed gray;"
          >Правый курс (tg:@rightcourse)</span>
        </h2>
        <v-card outlined class="ml-3 mt-2" v-if="poyasnenie" @click="poyasnenie=!poyasnenie">
          <v-card-text class="pb-1 pt-2" ><a href="https://t.me/rightcourse" target="_blank">@rightcoursee</a> - Все правые новости русского Telegram. <br/>Дисклеймер: наш канал является агрегатором и публикует самые разные идеи и мысли правого спектра от православных фундаменталистов до либертарианцев. Для связи с нами: <a href="https://t.me/rightcoursemessage" target="_blank">@rightcoursemessage</a></v-card-text>
        </v-card>

        <v-row class="ml-0">

          <v-col lg="4" md="6" sm="12" cols="12" v-for="(soobshenie,i) in feed.items" :key="i">
            <v-card outlined class="cardhov" height="100%"   @click.stop="vibrannoeSoobshenie=soobshenie;pokazatSoobshenie=true;" >
           <v-card-text style="word-break: normal" max-height="300px" > <div :inner-html.prop="soobshenie.content | truncate(600)"></div></v-card-text>
            </v-card>
          </v-col>
        </v-row>


        <v-dialog
          v-model="pokazatSoobshenie"
          :fullscreen="$vuetify.breakpoint.xs"
          max-width="600px"
          transition="slide-x-reverse-transition"
          v-if="vibrannoeSoobshenie!=null"
          scrollable
        >
          <v-card :max-height="$vuetify.breakpoint.xs? '': '90vh'">
       

            <v-divider class="pa-0" />

            <v-card-text class="pt-2" v-html="vibrannoeSoobshenie.content ">
              
            </v-card-text>

           <v-btn
              v-if="$vuetify.breakpoint.xs"
              color="#f4c900"
              link
              fab
              right
              fixed
              bottom
              @click="pokazatSoobshenie=false;"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Parser from "rss-parser";

export default {
  components: {},
  props: ["drawer"],

  watch: {
    drawer() {
      this.drawer2 = !this.drawer2;
    }
  },
  data: () => ({
    drawer2: false,
    statii: [],
    poyasnenie:true,
    pokazatSoobshenie:false,
    vibrannoeSoobshenie:"",
    feed:[]
  }),
  mounted(){
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

    let parser = new Parser();
    (async () => {

   this.feed = await parser.parseURL(CORS_PROXY +'https://rsshub.app/telegram/channel/rightcourse');


 

})();


    
  }

  
};
</script>

<style>
.cardhov:hover {
  background-color: #eeeeee;
}
</style>
