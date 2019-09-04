<template>
   <div class="fill-height">
  
    <v-navigation-drawer v-model="drawer" clipped app width="300px">
      <v-list class="py-0">
        <v-list-item class="px-1 py-0">
          <v-date-picker first-day-of-week="1"
          locale="ru" no-title class="elevation-0"
          v-model="focus"
          show-current="today">
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

    </appbar>


<v-content class="fill-height">
      <v-container
        style="height:99%"
        class="pa-0 ma-0"
        fluid
      >

       <FullCalendar
      height="parent"
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :header="false"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="events"
      @dateClick="handleDateClick"
      :firstDay="1"
      locale="ru"
      />


        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          max-width="400px"
          offset-x
        >
        
          <v-card 
          >
            <v-toolbar :color="selectedEvent.color"  height="32" elevation="1"> 
              <v-spacer/>
              <v-btn icon small @click="selectedOpen = false">
                <v-icon >mdi-close</v-icon>
              </v-btn>
              
              
            </v-toolbar>
            
            
              <v-sheet class="overflow-y-auto mt-1"
              min-width="150px"
            max-width="400px"
            max-height="500px"
              >
              <v-card-text>
              <h3> {{selectedEvent.name}}</h3>
              <span v-html="selectedEvent.details"></span>
              </v-card-text>
              </v-sheet>
            
          </v-card>
        </v-menu>
     
  </v-container>
   </v-content>
   </div>
</template>

<script>
import appbar from '../components/appbar.vue';
import ICAL from 'ical.js/build/ical.min.js';

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'


export default {
  components: {
    appbar,
    FullCalendar,
  },

  data: () => ({
    calendarPlugins: [ // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarWeekends: true,
      calendarEvents: [ // initial event data
        { title: 'Event Now', start: new Date() }
      ],

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
    events: [{ title: 'Event Now', start: new Date() }],
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

   
 
  },
  methods: {
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast() {
      let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
      calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    },
    handleDateClick(arg) {
      if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.calendarEvents.push({ // add new event data
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      }
    },
    async zagruzkaraspisaniya() {
      this.events = [];
      let url = '';
      if (this.mesto === 'Москва') { url = 'https://calendar.google.com/calendar/ical/ct8a4t3tuim1jjnkno2d6skkck%40group.calendar.google.com/public/basic.ics'; }
      if (this.mesto === 'Сеть') { url = 'https://calendar.google.com/calendar/ical/2kpu7kvisrlvmgkiheabippc20%40group.calendar.google.com/public/basic.ics'; }
      if (this.mesto === 'Санкт-Петербург') { url = 'https://calendar.google.com/calendar/ical/uq550s4cd42vsoojk09patvfvk%40group.calendar.google.com/public/basic.ics'; }
      if (this.mesto === 'остальная Россия') { url = 'https://calendar.google.com/calendar/ical/fsnvudft85si8k73nrki6i1sv4%40group.calendar.google.com/private-927c3a0c49464fbc850092facb59b783/basic.ics'; }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.text();

        const jcalData = ICAL.parse(data);
        const vcalendar = new ICAL.Component(jcalData);
        let novsob = {};
        for (let sob = 0; sob < vcalendar.jCal[2].length; sob++) {
          novsob = {};
          novsob.title = vcalendar.jCal[2][sob][1][10][3];
          novsob.details = vcalendar.jCal[2][sob][1][5][3];

          novsob.start  = new Date(vcalendar.jCal[2][sob][1][0][3]);
          

          novsob.end = new Date(vcalendar.jCal[2][sob][1][1][3]);
          
          novsob.color = 'none';

          if (novsob.title !== "CONFIRMED"){ this.events.push(novsob);}
        }
        console.log(this.events);
      }

      // throw new Error(response.status);
    },

  
  },

  mounted() {
    this.zagruzkaraspisaniya('Москва');


  
  },
};
</script>

<style  lang='scss'>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';




</style>
