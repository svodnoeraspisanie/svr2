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
        <v-list-item link @click="$vuetify.goTo(0);drawer2=false">
          <v-list-item-icon>
            <v-icon>mdi-progress-clock</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Идущие сборы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="$vuetify.goTo('#zavershennie',{offset:-150});drawer2=false">
          <v-list-item-icon>
            <v-icon>mdi-progress-check</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Завершённые сборы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          link
          @click="openlink('https://docs.google.com/forms/d/e/1FAIpQLSf8oxgFBIPUjz0kqAFoAmrJxDEVy6l76801t89LqXMbnkR55w/viewform?usp=sf_link');drawer2=false;"
        >
          <v-list-item-icon>
            <v-icon>mdi-database-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Предложить сбор</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
        <h2 @click="poyasnenie=!poyasnenie">
          <v-icon class="mr-2 pb-1" color="#0a7d9a">mdi-cash-multiple</v-icon>
          <span style="border-bottom: 1px dashed gray;">Гнездо </span>
        </h2>
        <v-card outlined class="ml-3 mt-2" v-if="poyasnenie" @click="poyasnenie=!poyasnenie">
          <v-card-text class="pb-1 pt-2" v-html="sbori_teksti.tekst"></v-card-text>
        </v-card>

        <v-row class="ml-0">

          <v-col lg="4" md="4" sm="12" cols="12" >
            <v-row class="ml-0 pb-4">
            <v-card class="cardhov" height="100%" outlined >
              <v-card-title>Побуждение</v-card-title>
              <v-card-text>В основе деятельности лежит побуждение,  это желание  сделать что-то. И возникает оно из осознания, что существующие положение вещей неудовлетворительно и его надо изменить.</v-card-text>
          </v-card>
            </v-row>
          <v-row class="ml-0">
          <v-card class="cardhov" height="100%" outlined >
           <v-card-title>Делание</v-card-title>
            <v-card-text>Извечный вопрос "что делать?" И несколько простых ответов. Есть хороший замысел - предложи. Нравится замыслел - воплоти. Уже идёт дело - присоединись. Не можешь присоединиться - поддержи и подпитай.  </v-card-text>
            </v-card>
          </v-row>
          </v-col>
          <v-col lg="8" md="8" sm="12" cols="12" >
            <v-card class="cardhov" height="100%" outlined >
              <v-card-title>Проблемы</v-card-title>
               <v-card-text>
              <v-simple-table dense>
                  <tbody>
                    <tr >
                      <td>Вымирание русских людей.</td>
                    </tr>
                    <tr >
                      <td>Отсутствие единства между русскими в России и вне её</td>
                    </tr>
                    <tr >
                      <td>Разделение русского народа на несколько стран</td>
                    </tr>
                    <tr >
                      <td>Непредставленность во власти РФ.</td>
                    </tr>
                    <tr >
                      <td>Отсутствие значимой общины русских в других странах</td>
                    </tr>
                    <tr >
                      <td>Красно-белый разлом после гражданской войны</td>
                    </tr>
                    <tr >
                      <td>Отсутствие гос. поддержки русского народа и культуры</td>
                    </tr>
                    <tr >
                      <td>Отсутствие у русских значимых медиа ресурсов</td>
                    </tr>
                    <tr >
                      <td>Контроль над богатствами страны в руках у нерусских.</td>
                    </tr>
                    <tr >
                      <td>Контроль за культурой РФ в руках новиопов</td>
                    </tr>
                    <tr >
                      <td>Утечка людей заграницу</td>
                    </tr>
                    <tr >
                      <td>Культ красных палачей и их методов. Их следы на русской земле и в душе</td>
                    </tr>
                  </tbody>
                </v-simple-table>
                 </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="ml-0">

          <v-col lg="6" md="6" sm="12" cols="12" >
            <v-card class="cardhov" height="100%" outlined >
              <v-card-title>Замыслы решений</v-card-title>
            </v-card>
          </v-col>
          <v-col lg="6" md="6" sm="12" cols="12" >
            <v-card class="cardhov" height="100%" outlined >
              <v-card-title>Существующие решения</v-card-title>
            </v-card>
          </v-col>
        </v-row>

       
      </v-container>
    </v-content>
  </div>
</template>

<script>
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
    sbori: [],
    poyasnenie: false,
    poyasnenie2: false,
    sbori_teksti: {},
    sboriZavershennie: []
  }),

  firestore() {
    return {
      sbori: this.$firebase.collection("sbori").orderBy("nazvanie", "asc").where("idet", "==", true),

      sboriZavershennie: this.$firebase
        .collection("sbori").orderBy("nazvanie", "asc")
        .where("idet", "==", false),
      sbori_teksti: this.$firebase.collection("teksti").doc("sbori-poyasnenie")
    };
  },
  methods: {
    openlink(arg) {
      window.open(arg, "_blank");
    }
  }
};
</script>

<style>
.cardhov:hover {
  background-color: #eeeeee;
}
</style>
