<template>
  <span>
    <v-navigation-drawer
      width="300px"
      clipped
      :permanent="!$vuetify.breakpoint.xs"
      v-model="drawer2"
      app
    >
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
            <v-icon>mdi-cash-multiple</v-icon>
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
            <v-list-item-title>События</v-list-item-title>
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

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            depressed
            color="#f4c900"
            @click="openlink('https://www.subscribestar.com/yasnost')"
          >Поддержать</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-content :style="$vuetify.breakpoint.xs? '': 'padding-top:0px'">
      <v-container class="px-6">
        <v-row>
          <v-col class="pt-0">
            <div class="headline font-weight-bold pb-1">
              <v-icon class="mr-2" color="#0a7d9a">mdi-message-text</v-icon>Новости
            </div>
            <v-card flat class="ml-2">
              <v-card-text class="pb-1 pt-2">
                <v-simple-table dense>
                  <tbody>
                    <tr
                      v-for="(novost,i) in novosti.slice().reverse()"
                      :key="i"
                      @click="$router.push({ path: novost.ssilka })"
                    >
                      <td valign="top">{{novost.data}}</td>
                      <td>{{novost.soobshenie}}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="pt-0 d-none d-sm-block">
            <div class="headline font-weight-bold pb-1">
              <router-link class="mainlink" to="/spravka">
                <v-icon class="mr-2" color="#0a7d9a">mdi-help-circle-outline</v-icon>
                {{tekst.nazvanie}}
              </router-link>
            </div>

            <v-card class="cardhov ml-2" flat :to="{path: `/predpriyatiya/svora`}">
              <v-card-text class="pb-1 pt-2" v-html="tekst.tekst"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div class="headline font-weight-bold pt-4">
          <router-link to="/raspisanie" class="mainlink">
            <v-icon class="mr-2" color="#0a7d9a">mdi-calendar</v-icon>Ближайшие события
          </router-link>
        </div>
        <v-row class="ml-0">
          <v-col class="pt-1" cols="12" sm="4">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/raspisanie" class="mainlink">
                <v-icon class="mr-2" color="#0a7d9a">mdi-web</v-icon>в Cети
              </router-link>
            </span>
            <v-card flat class="ml-2 mt-2">
              <v-card-text class="pt-2">
                <span class="subtitle-2">Сегодня</span>
                <div v-if="!raspsegondya[0].length" class="pl-2">нет сведений</div>

                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(sob,i) in raspsegondya[0]" :key="i">
                      <v-menu :close-on-content-click="false" max-width="400px" offset-x>
                        <template v-slot:activator="{ on }">
                          <td valign="top" v-on="on" class="font-weight-bold">{{sob.start.time}}</td>
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
                <v-divider />
                <span class="subtitle-2">Завтра</span>
                <div v-if="!raspzavtra[0].length" class="pl-2">нет сведений</div>

                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(sob,i) in raspzavtra[0]" :key="i">
                      <v-menu :close-on-content-click="false" max-width="400px" offset-x>
                        <template v-slot:activator="{ on }">
                          <td valign="top" v-on="on" class="font-weight-bold">{{sob.start.time}}</td>
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
          <v-col class="pt-1" cols="12" sm="4">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/raspisanie" class="mainlink">
                <v-icon class="mr-2" color="#0a7d9a">mdi-city</v-icon>в Москве
              </router-link>
            </span>
            <v-card flat class="ml-2 mt-2">
              <v-card-text class="pt-2">
                <span class="subtitle-2">Сегодня</span>
                <div v-if="!raspsegondya[1].length" class="pl-2">нет сведений</div>
                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(sob,i) in raspsegondya[1]" :key="i">
                      <v-menu :close-on-content-click="false" max-width="400px" offset-x>
                        <template v-slot:activator="{ on }">
                          <td valign="top" v-on="on" class="font-weight-bold">{{sob.start.time}}</td>
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
                <v-divider />
                <span class="subtitle-2">Завтра</span>
                <div v-if="!raspzavtra[1].length" class="pl-2">нет сведений</div>

                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(sob,i) in raspzavtra[1]" :key="i">
                      <v-menu :close-on-content-click="false" max-width="400px" offset-x>
                        <template v-slot:activator="{ on }">
                          <td valign="top" v-on="on" class="font-weight-bold">{{sob.start.time}}</td>
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
          <v-col class="pt-1" cols="12" sm="4">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/raspisanie" class="mainlink">
                <v-icon class="mr-2" color="#0a7d9a">mdi-anchor</v-icon>в Санкт-Петербурге
              </router-link>
            </span>
            <v-card flat class="ml-2 mt-2">
              <v-card-text class="pt-2">
                <span class="subtitle-2">Сегодня</span>
                <div v-if="!raspsegondya[2].length" class="pl-2">нет сведений</div>
                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(sob,i) in raspsegondya[2]" :key="i">
                      <v-menu :close-on-content-click="false" max-width="400px" offset-x>
                        <template v-slot:activator="{ on }">
                          <td valign="top" v-on="on" class="font-weight-bold">{{sob.start.time}}</td>
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
                <v-divider />
                <span class="subtitle-2">Завтра</span>
                <div v-if="!raspzavtra[2].length" class="pl-2">нет сведений</div>

                <v-simple-table dense>
                  <tbody>
                    <tr v-for="(sob,i) in raspzavtra[2]" :key="i">
                      <v-menu :close-on-content-click="false" max-width="400px" offset-x>
                        <template v-slot:activator="{ on }">
                          <td valign="top" v-on="on" class="font-weight-bold">{{sob.start.time}}</td>
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
        </v-row>

        <div class="headline font-weight-bold pt-4">
          <v-icon class="mr-2" color="#0a7d9a">mdi-tab-plus</v-icon>Поддержать
        </div>
        <v-row class="ml-0">
          <v-col class="pt-0" cols="12" sm="4">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/sbori" class="mainlink">
                <v-icon class="mr-2" color="#0a7d9a">mdi-cash-100</v-icon>Дело
              </router-link>
            </span>

            <v-card flat class="ml-2 mt-2">
              <v-btn
                color="#0a7d9a"
                fab
                dark
                small
                absolute
                top
                depressed
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

                <v-card-title
                  class="subtitle-1 font-weight-bold"
                  style="color:#1f2020; word-break: normal;"
                >{{sbori[si].nazvanie}}</v-card-title>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="pt-0" cols="12" sm="4">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/predpriyatiya" class="mainlink">
                <v-icon class="mr-2" color="#0a7d9a">mdi-account-group</v-icon>Предприятие
              </router-link>
            </span>

            <v-card flat class="ml-2 mt-2">
              <v-btn
                color="#0a7d9a"
                fab
                dark
                small
                absolute
                top
                right
                depressed
                style="margin-top:5px;margin-right:-24px"
                @click="pi=anyel(pi,predpriyatiya)"
              >
                <v-icon>mdi-shuffle-variant</v-icon>
              </v-btn>
              <router-link class="cardlink" :to="{path: `/predpriyatiya/${predpriyatiya[pi].id}`}">
                <v-card-text class="cardhov">
                  <v-img
                    :src="predpriyatiya[pi].obraz"
                    eager
                    aspect-ratio="1.5"
                    contain
                    class="ma-2"
                  >
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="#0a7d9a"></v-progress-circular>
                    </v-layout>
                  </v-img>

                  <v-card-title
                    class="subtitle-1 font-weight-bold"
                    style=" word-break: normal"
                  >{{predpriyatiya[pi].nazvanie}}</v-card-title>
                </v-card-text>
              </router-link>
            </v-card>
          </v-col>

          <v-col class="pt-0" cols="12" sm="4">
            <span class="subtitle-1 font-weight-bold">
              <router-link to="/prisoedinitsya" class="mainlink">
                <v-icon class="mr-2" color="#0a7d9a">mdi-lightbulb-on-outline</v-icon>Замысел
              </router-link>
            </span>
            <v-card flat class="ml-2 mt-2" to="/prisoedinitsya">
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
        </v-row>
      </v-container>
    </v-content>
  </span>
</template>

<script>
import { db } from "../db";

export default {
  components: {},

  props: ["drawer"],

  data: () => ({
    drawer2: false,
    sbori: [{ id: "1", obraz: "" }],
    predpriyatiya: [{ id: "1", obraz: "" }],
    novosti: [],
    zamisli: [{ nazvanie: "" }],
    si: 0,
    pi: 0,
    tekst: {},

    raspsegondya: [[], [], []],
    raspzavtra: [[], [], []]
  }),
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",

    drawer() {
      this.drawer2 = !this.drawer2;
    }
  },
  mounted() {
    this.zagruzkaraspisaniya();

    window.setInterval(() => {
      this.si = this.anyel(this.si, this.sbori);
      this.pi = this.anyel(this.pi, this.predpriyatiya);
    }, 12000);
  },
  methods: {
    fetchData() {
      db.collection("teksti")
        .doc("glavnaya")
        .get()
        .then(snapshot => {
          this.tekst = snapshot.data();
        });
    },
    normtime(arg) {
      const d = new Date(arg);
      return `${d.getHours}:${d.getMinutes}`;
    },

    async zagruzkaraspisaniya() {
      const googleCalendarApiKey = "AIzaSyCSV5kxpkQN3Vfvg_9D_vyBN2DQ7AiBzr4";
      const caladr = "https://www.googleapis.com/calendar/v3/calendars/";
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      const tomorrow = new Date(today.getTime() + 48 * 60 * 60 * 1000 - 1000);
      console.log(today, tomorrow);
      const cals = [
        "2kpu7kvisrlvmgkiheabippc20@group.calendar.google.com",
        "ct8a4t3tuim1jjnkno2d6skkck@group.calendar.google.com",
        "uq550s4cd42vsoojk09patvfvk@group.calendar.google.com"
      ];

      for (let i = 0; i < cals.length; i++) {
        const url = `${caladr +
          encodeURIComponent(cals[i])}/events?timeMin=${encodeURIComponent(
          today.toISOString()
        )}&timeMax=${encodeURIComponent(
          tomorrow.toISOString()
        )}&key=${googleCalendarApiKey}`;

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          data.items.sort(function(a, b) {
            if (new Date(a.start.dateTime) > new Date(b.start.dateTime)) {
              return 1;
            }
            if (new Date(a.start.dateTime) < new Date(b.start.dateTime)) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          });

          for (let j = 0; j < data.items.length; j++) {
            data.items[j].start.time = new Date(
              data.items[j].start.dateTime
            ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            if (
              new Date(data.items[j].start.dateTime).getDay() ==
              new Date().getDay()
            ) {
              this.raspsegondya[i].push(data.items[j]);
            } else {
              this.raspzavtra[i].push(data.items[j]);
            }
          }
        }
      }

      console.log(this.raspsegondya);
      console.log(this.raspzavtra);
    },

    openlink(arg) {
      window.open(arg, "_blank");
    },
    anyel(i, ar) {
      const i2 = ~~(Math.random() * ar.length);

      return i == i2 ? (i == ar.length - 1 ? i - 1 : i + 1) : i2;
    }
  },

  firestore: {
    sbori: db.collection("sbori"),
    predpriyatiya: db.collection("predpriyatiya"),
    novosti: db.collection("novosti"),
    zamisli: db.collection("zamisli")
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

.mainlink i {
  display: inline-block;
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

.smtop {
  padding-top: 56px;
}
.bigtop {
  padding-top: 0px !important;
}
</style>
