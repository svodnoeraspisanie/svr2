<template>
  <div class="fill-height">
   
   <v-app-bar
    
    app
    elevation="0"
    
  
  >


  <div style="max-width:220px">
    <v-select autofocus flat :items="cals" item-text="title" return-object  label="Место" v-model="events" outlined dense class="pt-7 mr-2" ></v-select>     
  </div>
  <v-divider vertical/>
      <v-btn outlined @click="setToday" class="ml-2">Сегодня</v-btn>
      <v-btn  @click="prev" outlined class="ml-2" min-width="36px" width="36px">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn  @click="next" outlined class="ml-2" min-width="36px" width="36px">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      
      <v-toolbar-title class="ml-2">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn outlined @click="changeView('dayGridMonth')">Месяц</v-btn>
      <v-btn outlined class="ml-2" @click="changeView('timeGridWeek')">Неделя</v-btn>
      <v-btn outlined class="ml-2" @click="changeView('timeGridDay')">День</v-btn>
      <v-btn outlined class="ml-2" @click="changeView('listMonth')">Расписание</v-btn>
   
   </v-app-bar>
   <v-navigation-drawer  permanent  app width="300px"  >
           <v-list-item to="/">
        <v-list-item-content>

         <v-img src="/svora.png" contain></v-img>
    

        </v-list-item-content>
      </v-list-item>
<v-divider></v-divider>
<minitoolbar/>
      <v-list >
        
           <v-list-item  link to="/" dense>
            <v-list-item-icon>
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Назад</v-list-item-title>
              
            </v-list-item-content>
            
          </v-list-item>
          <v-divider></v-divider>
 
        <v-list-item class="px-0 py-0">
          <v-date-picker
            first-day-of-week="1"
            locale="ru"
            no-title
            class="elevation-0"
            v-model="focus"
            show-current
            reactive
            @change="gotodate"
          ></v-date-picker>
        </v-list-item>
        <v-divider></v-divider>

        
      </v-list>
   </v-navigation-drawer>
    

    <v-content class="fill-height">
      <v-container style="height:99%" class="pa-0 ma-0" fluid>
        <FullCalendar
          height="parent"
          ref="fullCalendar"
          v-model="focus"
          :defaultView="type"
          eventTextColor="black"
          :allDaySlot="false"
          :eventLimit="true"
          eventLimitText="ещё"
          :nowIndicator="true"
          :header="false"
          :plugins="calendarPlugins"
          :weekends="calendarWeekends"
          :events="events"
          :googleCalendarApiKey="googleCalendarApiKey"
          :firstDay="1"
          locale="ru"
          :views="{
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
          <v-card>
            <v-toolbar :color="selectedEvent.color" height="32" elevation="1">
              <v-spacer />
              <v-btn icon small @click="selectedOpen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-sheet
              class="overflow-y-auto mt-1"
              min-width="150px"
              max-width="400px"
              max-height="500px"
            >
              <v-card-text>
                <h3>{{selectedEvent.title}}</h3>
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
import appbar from "../components/appbar.vue";
import minitoolbar from "../components/minitoolbar.vue";


import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { formatDate } from "@fullcalendar/core";

export default {
  components: {
    appbar,
  minitoolbar,
    FullCalendar
  },

  data: () => ({
    cardposX: 0,
    cardposY: 0,
    calendarApi: null,

    title: "",
    calendarPlugins: [
      // plugins must be defined in the JS
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      googleCalendarPlugin,
      interactionPlugin // needed for dateClick
    ],
    calendarWeekends: true,

    googleCalendarApiKey: "AIzaSyCSV5kxpkQN3Vfvg_9D_vyBN2DQ7AiBzr4",

    drawer: true,
    wd: [1, 2, 3, 4, 5, 6, 0],

    mesta: ["Сеть", "Москва", "Санкт-Петербург"],
    mesto: "Сеть",
   
    loading: false,
    
    showTooltip: false,
    

    today: "",
    focus: "",
    type: "dayGridMonth",

    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

       
    events:{
      title:"Сеть",
      googleCalendarId:
          "2kpu7kvisrlvmgkiheabippc20@group.calendar.google.com",
        color: "#c5dde8",
        className: "set"
    },


    cals:[
    {
      title:"Сеть",
      googleCalendarId:
          "2kpu7kvisrlvmgkiheabippc20@group.calendar.google.com",
        color: "#c5dde8",
        className: "set"
    },

    {
      title:"Москва",
      googleCalendarId:
          "ct8a4t3tuim1jjnkno2d6skkck@group.calendar.google.com",
          color: "#cde6bb",
        className: "moskva"
    },

    {
      title:"Санкт-Петербург",
      googleCalendarId:
          "uq550s4cd42vsoojk09patvfvk@group.calendar.google.com",
        color: "#e9ddbb",
        className: "piter"
    }]
  }),

  computed: {
    //

    allSelected() {
      return this.selected.length === this.items.length;
    },
    categories() {
      const search = this.search.toLowerCase();

      if (!search) return this.items;

      return this.items.filter(item => {
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
    }
  },
  methods: {
    clickdate(arg) {
      this.changeView("timeGridDay");
      this.calendarApi.gotoDate(arg.date);
    },

    update() {
      this.title = this.calendarApi.view.title;
    },

    changeView(view) {
      this.calendarApi.changeView(view);
      this.type = view;
      this.calendarApi.scrollToTime(this.calendarApi.getDate());
    },

    gotodate() {
      this.calendarApi.gotoDate(new Date(this.focus));
    },

    prev() {
      this.calendarApi.prev();
      this.focus = dateToYMD(this.calendarApi.getDate());
    },
    next() {
      this.calendarApi.next();
      this.focus = dateToYMD(this.calendarApi.getDate());
    },
    setToday() {
      this.calendarApi.today();
      this.focus = dateToYMD(this.calendarApi.getDate());
    },

    eventRender(arg) {},

    showevent(arg) {
      console.log(arg);
      console.log("click");
      arg.jsEvent.preventDefault();

      const open = () => {
        this.selectedEvent = arg.event;
        this.selectedEvent.description = arg.event.extendedProps.description;
        this.selectedElement = arg.el;
        this.cardposX = arg.jsEvent.pageX;
        this.cardposY = arg.jsEvent.pageY;
        console.log(this.selectedElement);
        setTimeout(() => (this.selectedOpen = true), 1);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 1);
      } else {
        open();
      }
      arg.jsEvent.stopPropagation();
    }
  },

  mounted() {
    this.today = new Date();
    this.focus = dateToYMD(this.today);
    this.calendarApi = this.$refs.fullCalendar.getApi();
    console.log(this.focus);
  }
};

function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}
</script>

<style  lang='scss'>
.fc-head {
  background-color:#fcf8e3;
  
}
.fc-day-header.fc-sat{
  background-color:#f2e1e1;
}
.fc-day-header.fc-sun{
  background-color:#f2e1e1;
}
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
@import "~@fullcalendar/list/main.css";
</style>
