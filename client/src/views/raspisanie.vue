<template>
  <v-container fluid pa-0 ma-0 style="height:100%;">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app width="300px">
      <v-list class="py-0">
        <v-list-item class="px-1 py-0">
          <v-date-picker first-day-of-week="1"
          locale="ru" no-title class="elevation-0">
          </v-date-picker>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
             <v-select
          :items="mesta"
          label="Выбор места"
          v-model="mesto"
          @change="zagruzkaraspisaniya()"

        ></v-select>
            <v-list-item-title class="title">Метки:</v-list-item-title>

            <div>
              <v-chip
                v-for="(selection, i) in selections"
                :key="selection.text"
                :disabled="loading"
                class="mb-1 mr-1"
                @click="selected.splice(i, 1)"
                small
              >
                <v-icon left v-text="selection.icon"></v-icon>
                {{ selection.text }}
              </v-chip>
            </div>

            <v-flex v-if="!allSelected" xs12>
              <v-text-field
                ref="search"
                v-model="search"
                full-width
                hide-details
                label="Поиск"
                single-line
              ></v-text-field>
              <v-divider v-if="!allSelected"></v-divider>
            </v-flex>

            <v-list>
              <template v-for="(item, i) in categories">
                <v-list-item
                  v-if="!selected.includes(i)"
                  :key="i"
                  :disabled="loading"
                  @click="selected.push(i)"
                >
                  <v-list-item-avatar>
                    <v-icon :disabled="loading" v-text="item.icon"></v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <appbar v-on:toggle-drawer="drawer=!drawer">
      <v-btn outlined  @click="setToday">Сегодня</v-btn>
      <v-btn icon @click="prev">
        <v-icon >mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="next">
        <v-icon >mdi-chevron-right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom right>
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on">
            <span>{{ typeToLabel[type] }}</span>
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="type = 'day'">
            <v-list-item-title>День</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'week'">
            <v-list-item-title>Неделя</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'month'">
            <v-list-item-title>Месяц</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = '4day'">
            <v-list-item-title>4 дня</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </appbar>

    <v-container fluid class="fill-height" >
      <v-divider vertical></v-divider>
      <v-row class="fill-height" >
    <v-col class="fill-height">
      <v-sheet class="fill-height">
        <v-divider></v-divider>

        <v-calendar 
          
          ref="calendar"
          v-model="focus"
          color="primary"
          :weekdays="wd"
          :shortMonths="false"
          :shortWeekdays="false"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>

        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="150px"
            max-width="400px"
            flat
            class="overflow-y-auto"
            max-height="500px"
          >
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon @click="selectedOpen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-sheet>
         </v-col>
  </v-row>
    </v-container> 
  </v-container>
</template>

<script>
import appbar from '../components/appbar.vue';
import ICAL from 'ical.js/build/ical.min.js';

export default {
  components: {
    appbar,
  },

  data: () => ({
    drawer: true, 
    wd:[1, 2, 3, 4, 5, 6, 0],
    
    mesta: ['Сеть', 'Москва', 'Санкт-Петербург', 'остальная Россия'],
    mesto: 'Сеть',
    items: [
      {
        text: 'Лекции',
        icon: 'mdi-nature',
      },
      {
        text: 'Экскурсии',
        icon: 'mdi-glass-wine',
      },
      {
        text: 'Москва',
        icon: 'mdi-calendar-range',
      },
      {
        text: 'Санкт-Петербург',
        icon: 'mdi-map-marker',
      },
      {
        text: 'Концерты',
        icon: 'mdi-bike',
      },
    ],
    loading: false,
    search: '',
    selected: [],

    today: '2019-08-19',
    focus: '2019-08-19',
    type: 'month',
    typeToLabel: {
      month: 'Месяц',
      week: 'Неделя',
      day: 'День',
      '4day': '4 дня',
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    ev2: [],
    events: [],
  }),
  computed: {
    allSelected() {
      return this.selected.length === this.items.length;
    },
    categories() {
      const search = this.search.toLowerCase();

      if (!search) return this.items;

      return this.items.filter((item) => {
        const text = item.text.toLowerCase();

        return text.indexOf(search) > -1;
      });
    },
    selections() {
      const selections = [];

      for (const selection of this.selected) {
        selections.push(this.items[selection]);
      }

      return selections;
    },

    title() {
      const { start, end } = this;
      if (!start || !end) {
        return '';
      }
      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? '' : endMonth;
      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? '' : endYear;
      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);
      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear} г.`;
        case 'week':
          return `${startDay} ${startMonth} ${startYear} - ${endDay} ${suffixMonth} ${suffixYear} г.`;
        case '4day':
          return `${startDay} ${startMonth} ${startYear} - ${endDay} ${suffixMonth} ${suffixYear} г.`;
        case 'day':
          return `${startDay} ${startMonth} ${startYear} г.`;
      }
      return '';
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC',
        month: 'long',
      });
    },
  },
  methods: {
    async zagruzkaraspisaniya() {
      this.events = [];
      let url = '';
      if (this.mesto === 'Москва') { url = 'https://calendar.google.com/calendar/ical/ct8a4t3tuim1jjnkno2d6skkck%40group.calendar.google.com/public/basic.ics'; }
      if (this.mesto === 'Сеть') { url = 'https://calendar.google.com/calendar/ical/2kpu7kvisrlvmgkiheabippc20%40group.calendar.google.com/public/basic.ics'; }
      if (this.mesto === 'Санкт-Петербург') { url = 'https://calendar.google.com/calendar/ical/uq550s4cd42vsoojk09patvfvk%40group.calendar.google.com/public/basic.ics'; }

      console.log(this.mesto);
      console.log(url);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.text();

        const jcalData = ICAL.parse(data);
        const vcalendar = new ICAL.Component(jcalData);
        let novsob = {};
        for (let sob = 0; sob < vcalendar.jCal[2].length; sob++) {
          novsob = {};
          novsob.name = vcalendar.jCal[2][sob][1][10][3];
          novsob.details = vcalendar.jCal[2][sob][1][5][3];

          const start = new Date(vcalendar.jCal[2][sob][1][0][3]);
          novsob.start = `${start.getFullYear()}-${start.getMonth()
            + 1}-${start.getDate()} ${start.getHours()}:${start.getMinutes()}`;

          const end = new Date(vcalendar.jCal[2][sob][1][1][3]);
          novsob.end = `${end.getFullYear()}-${end.getMonth()
            + 1}-${end.getDate()} ${end.getHours()}:${end.getMinutes()}`;
          novsob.color = 'light-blue';

          this.events.push(novsob);
        }
        console.log(this.events);
      }

      // throw new Error(response.status);
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? '-ое'
        : ['-ео', '-ое', '-ое', '-е', '-ое', '-ое', '-ое', '-ое', '-ое', '-ое'][
          d % 10
        ];
    },
  },

  mounted() {
    this.zagruzkaraspisaniya('Москва');
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    this.today = `${yyyy}-${mm}-${dd}`;
    this.focus = `${yyyy}-${mm}-${dd}`;
    const start = `${yyyy}-${mm}- 01`;
    const end = `${yyyy}-${mm}- 31`;

    this.updateRange({ start, end });
  },
};
</script>

<style >
.v-calendar .v-event.v-event-start {
  margin-left: 5px;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__head-weekday {
  padding-top: 4px;
}
</style>
