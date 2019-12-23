<template>
  <span>
    <v-navigation-drawer width="300px" permanent clipped app>
      <v-list>
        <v-list-item link to="/statii">
          <v-list-item-icon>
            <v-icon>mdi-book-open</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Статьи</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/predpriyatiya">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Предприятия</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/sbori">
          <v-list-item-icon>
            <v-icon>mdi-cash-100</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Сборы средств</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/raspisanie">
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Расписание событий</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/prisoedinitsya">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Присоединиться</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/spravka">
          <v-list-item-icon>
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Ответы на вопросы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content class="pt-0">
      <v-container class="px-6">
        <v-row>
          <v-col class="pt-0">
            <div class="headline font-weight-bold pb-1">Новости</div>
            <v-card flat>
              <v-card-text class="pb-1 pt-2">
                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(novost,i) in novosti" :key="i">
                      <td valign="top">{{novost.data}}</td>
                      <td>{{novost.soobshenie}}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="pt-0">
            <div class="headline font-weight-bold pb-1">
              <router-link class="mainlink" to="/spravka">Что такое Свора?</router-link>
            </div>
            <v-card flat>
              <v-card-text class="pb-1 pt-2">
                <b>Свора - это дом русского национального предпринимательства и благотворительности.</b>
                <br />
                <p>
                  Здесь собраны сведения о русских национальных предприятиях, о том как их
                  можно поддержать и о мероприятиях, которые они проводят.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div class="headline font-weight-bold">
          <router-link to="/raspisanie" class="mainlink">Сегодняшние события</router-link>
        </div>
        <v-row>
          <v-col class="pt-0">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/raspisanie" class="mainlink">в Cети</router-link>
            </span>
            <v-card flat>
              <v-card-text>
                <div v-if="!rasps[0].length"> В нашем расписании событий в этот день нет</div>

                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(sob,i) in rasps[0]" :key="i">
                     
                      <v-menu :close-on-content-click="false" max-width="400px" offset-x>

                        <template v-slot:activator="{ on }">
                          <td valign="top" v-on="on">{{sob.start.dateTime}}</td>
                          <td v-on="on">{{sob.summary}}</td>
                        </template>

                        <v-card>
                                              <v-sheet
                            class="overflow-y-auto mt-1"
                            min-width="150px"
                            max-width="400px"
                            max-height="500px"
                          >
                            <v-card-text>
                              <h3>{{sob.summary}}</h3>
                              <div v-html="sob.description"></div>
                            </v-card-text>
                          </v-sheet>
                        </v-card>
                      </v-menu>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="pt-0">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/raspisanie" class="mainlink">в Москве</router-link>
            </span>
            <v-card flat>
              <v-card-text>
                <div v-if="!rasps[1].length"> В нашем расписании событий в этот день нет</div>
                <v-simple-table dense >
                  <tbody>
                   <tr v-for="(sob,i) in rasps[1]" :key="i">
                     
                      <v-menu :close-on-content-click="false" max-width="400px" offset-x>

                        <template v-slot:activator="{ on }">
                          <td valign="top" v-on="on">{{sob.start.dateTime}}</td>
                          <td v-on="on">{{sob.summary}}</td>
                        </template>

                        <v-card>
                                              <v-sheet
                            class="overflow-y-auto"
                            min-width="150px"
                            max-width="400px"
                            max-height="500px"
                          >
                            <v-card-text>
                              <h3>{{sob.summary}}</h3>
                              <div v-html="sob.description"></div>
                            </v-card-text>
                          </v-sheet>
                        </v-card>
                      </v-menu>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="pt-0">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/raspisanie" class="mainlink">в Санкт-Петербурге</router-link>
            </span>
            <v-card flat>
              <v-card-text>
                <div v-if="!rasps[2].length"> В нашем расписании событий в этот день нет</div>
                <v-simple-table dense>
                  <tbody>
                   <tr v-for="(sob,i) in rasps[2]" :key="i">
                     
                      <v-menu :close-on-content-click="false" max-width="400px" offset-x>

                        <template v-slot:activator="{ on }">
                          <td valign="top" v-on="on">{{sob.start.dateTime}}</td>
                          <td v-on="on">{{sob.summary}}</td>
                        </template>

                        <v-card>
                                              <v-sheet
                            class="overflow-y-auto"
                            min-width="150px"
                            max-width="400px"
                            max-height="500px"
                          >
                            <v-card-text>
                              <h3>{{sob.summary}}</h3>
                              <div v-html="sob.description"></div>
                            </v-card-text>
                          </v-sheet>
                        </v-card>
                      </v-menu>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <div class="headline font-weight-bold">Поддержать</div>
        <v-row>
          <v-col class="pt-0">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/sbori" class="mainlink">Дело</router-link>
            </span>

            <v-card flat>
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

              <v-card-text class="cardhov" @click="openlink(sbori[si].ssilka)">

                <v-img :src="sbori[si].obraz" aspect-ratio="1.5" contain eager class="ma-2">
                  <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate color="#0a7d9a"></v-progress-circular>
                  </v-layout>
                </v-img>

                <v-card-title class="subtitle-2 font-weight-bold" style="color:#1f2020" >{{sbori[si].nazvanie}}</v-card-title>
              
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="pt-0">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/predpriyatiya" class="mainlink">Предприятие</router-link>
            </span>

            <v-card flat>
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
              <router-link class="cardlink" :to="{path: `/predpriyatiya/${predpriyatiya[pi].id}`}">
                <v-card-text class="cardhov">
                  <v-img :src="predpriyatiya[pi].obraz" eager aspect-ratio="1.5" contain class="ma-2">
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="#0a7d9a"></v-progress-circular>
                    </v-layout>
                  </v-img>

                  <v-card-title class="subtitle-2 font-weight-bold">{{predpriyatiya[pi].nazvanie}}</v-card-title>
        
                 
                </v-card-text>
              </router-link>
            </v-card>
          </v-col>

          <v-col class="pt-0">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/prisoedinitsya" class="mainlink">Замысел</router-link>
            </span>
            <v-card flat>
              <v-card-text>
                <v-simple-table dense>
                  <tbody>
                    <tr>
                      <td>Сделать нашим хорошо</td>
                    </tr>
                    <tr>
                      <td>А чужим сделать плохо</td>
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
import appbar from "../components/appbar.vue";
import { db } from "../db";

export default {
  components: {
    appbar
  },

  data: () => ({
    drawer: true,
    sbori: [],
    predpriyatiya: [],
    novosti: [],
    si: 0,
    pi: 0,

    rasps: [[],[],[]],
  }),
  created() {
    this.zagruzkaraspisaniya();
  },
  mounted(){
    window.setInterval(()=>{
      this.si=this.anyel(this.si,this.sbori);
      this.pi=this.anyel(this.pi,this.predpriyatiya);
    }, 10000);

  },
  methods: {
    normtime(arg) {
      var d = new Date(arg);
      return d.getHours + ":" + d.getMinutes;
    },

    async zagruzkaraspisaniya() {
      const googleCalendarApiKey = "AIzaSyCSV5kxpkQN3Vfvg_9D_vyBN2DQ7AiBzr4";
      const caladr = "https://www.googleapis.com/calendar/v3/calendars/";
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

      let cals = [
        "2kpu7kvisrlvmgkiheabippc20@group.calendar.google.com",
        "ct8a4t3tuim1jjnkno2d6skkck@group.calendar.google.com",
        "uq550s4cd42vsoojk09patvfvk@group.calendar.google.com"
      ];

      for (var i = 0; i < cals.length; i++) {
        var url =
          caladr +
          encodeURIComponent(cals[i]) +
          "/events?timeMin=" +
          encodeURIComponent(today.toISOString()) +
          "&timeMax=" +
          encodeURIComponent(tomorrow.toISOString()) +
          "&key=" +
          googleCalendarApiKey;

        let response = await fetch(url);
        if (response.ok) {
          var data = await response.json();

          for (var j = 0; j < data.items.length; j++) {
            data.items[j].start.dateTime = new Date(
              data.items[j].start.dateTime
            ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          }

          this.rasps[i] = data.items;
        }
      }

      console.log(this.rasps);
    },

    openlink(arg) {
      window.open(arg, "_blank");
    },
    anyel(i, ar) {
      let i2 = ~~(Math.random() * ar.length);

      return i == i2 ? (i == ar.length - 1 ? i - 1 : i + 1) : i2;
    }
  },

  firestore: {
    sbori: db.collection("sbori"),
    predpriyatiya: db.collection("predpriyatiya"),
    novosti: db.collection("novosti")
  }
};
</script>
<style scoped>
.mainlink {
  text-decoration: none;
  color: #1f2020 !important;
}
.mainlink:hover {
  text-decoration: underline;
  color: #1f2020 !important;
}
.cardlink {
  text-decoration: none;
  color: #1f2020 !important;
}
.cardlink:hover {
  text-decoration: none;
  color: #1f2020 !important;
}
.cardhov:hover {
  background-color: #eeeeee;
}
</style>
