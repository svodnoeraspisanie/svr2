<template>
   <div class="fill-height">
  
    <v-navigation-drawer v-model="drawer" clipped app width="300px">
      <v-list class="py-0">
        <v-list-item class="px-1 py-0">
          <v-date-picker first-day-of-week="1"
          locale="ru" no-title class="elevation-0"
          v-model="focus"
         show-current
          reactive
          @change="gotodate">
          </v-date-picker>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
             <v-select
          :items="mesta"
          label="Выбор места"
          v-model="mesto"
        

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
      <v-toolbar-title  > {{title}}</v-toolbar-title>
      <v-spacer></v-spacer>

      
        <v-btn outlined  @click="changeView('dayGridMonth')">Месяц</v-btn>
        <v-btn outlined class="ml-2" @click="changeView('timeGridWeek')">Неделя</v-btn>
        <v-btn outlined class="ml-2" @click="changeView('timeGridDay')">День</v-btn>
        <v-btn outlined class="ml-2" @click="changeView('listMonth')">Расписание</v-btn>
      

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
      v-model="focus"
      :defaultView="type"
      eventTextColor ="black"
      :allDaySlot="false"
      :eventLimit="true"
      eventLimitText="ещё"
      :nowIndicator="true"
      :header="false"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      
      :eventSources="eventSources"
      :googleCalendarApiKey="googleCalendarApiKey"
      
      :firstDay="1"
      locale="ru"

      :views= "{
      timeGridDay: {
      type: 'timeGrid',
      duration: { days: 1 },
      }}"

      :listDayFormat="{month: 'long',
    year: 'numeric',
    day: 'numeric',
    weekday: 'long'}"
    :listDayAltFormat="false"

      @eventClick="showevent"
      @datesRender="update"
      
      />


        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          
          :position-x="cardposX"
          :position-y="cardposY"
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
              <h3> {{selectedEvent.title}}</h3>
              <div v-html="selectedEvent.description"></div>
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

import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { formatDate } from '@fullcalendar/core';

export default {
  components: {
    appbar,
    FullCalendar,
  },

  data: () => ({
    cardposX:0,
    cardposY:0,
    calendarApi:null,

  title:"",
    calendarPlugins: [ // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        googleCalendarPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarWeekends: true,
      
    googleCalendarApiKey: "AIzaSyCSV5kxpkQN3Vfvg_9D_vyBN2DQ7AiBzr4",

    drawer: true, 
    wd:[1, 2, 3, 4, 5, 6, 0],
    
    mesta: ['Сеть', 'Москва', 'Санкт-Петербург'],
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

    today: '',
    focus: '',
    type: 'dayGridMonth',
 

    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    
    eventSources: [
        {
          googleCalendarId: '2kpu7kvisrlvmgkiheabippc20@group.calendar.google.com',
          color: 'yellow',
          className:'set',
        },
        {
          googleCalendarId: 'ct8a4t3tuim1jjnkno2d6skkck@group.calendar.google.com',
          className:'moskva',
        },
        {
          googleCalendarId: 'uq550s4cd42vsoojk09patvfvk@group.calendar.google.com',
          color: 'red',
          className:'piter',
        }
      ],

    events: {
    googleCalendarId: 'ct8a4t3tuim1jjnkno2d6skkck@group.calendar.google.com'
  },
  }),
  
  computed: {

 
    // 
    
       
    
   
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
     clickdate(arg){

     this.changeView('timeGridDay');
    this.calendarApi.gotoDate(arg.date);
    },

  update(){

      this.title=this.calendarApi.view.title;
    },


    changeView(view){

      this.calendarApi.changeView(view);
      this.type=view;
      this.calendarApi.scrollToTime(this.calendarApi.getDate());
    },
  
    gotodate(){

      this.calendarApi.gotoDate(new Date(this.focus));

    },

    prev(){
    
      this.calendarApi.prev();
      this.focus=this.calendarApi.getDate().toISOString().substr(0, 10);
      
    },
    next(){
    
      this.calendarApi.next();
   this.focus=this.calendarApi.getDate().toISOString().substr(0, 10)
     
      
     
    },
    setToday(){

      this.calendarApi.today();
   
    },

    
    showevent(arg) {
      console.log(arg);
      arg.jsEvent.preventDefault(); 

      const open = () => {
        this.selectedEvent = arg.event;
        this.selectedEvent.description = arg.event.extendedProps.description;
        this.selectedElement = arg.el;
        this.cardposX=arg.jsEvent.pageX;
        this.cardposY=arg.jsEvent.pageY;
        console.log(this.selectedElement);
        setTimeout(() => (this.selectedOpen = true), 3);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      arg.jsEvent.stopPropagation();
    },
      
    
   

  
  },

  mounted() {
  
    this.today=new Date();
    this.focus=this.today.toISOString().substr(0, 10);
    this.calendarApi=this.$refs.fullCalendar.getApi();
    console.log(this.focus);

  
  },
};
</script>

<style  lang='scss'>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
@import '~@fullcalendar/list/main.css';



</style>
