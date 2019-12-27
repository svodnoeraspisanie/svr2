<template>
  <div class="fill-height">
    <v-navigation-drawer
      :permanent="!$vuetify.breakpoint.xs"
      v-model="drawer2"
      app
      width="300px"
      clipped
    >
      <v-list>
        <v-list-item link to="/" dense>
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

    <v-content class="fill-height" :style="$vuetify.breakpoint.xs? '': 'padding-top:0px'">
      <v-container class="cont pa-0 ma-0" fluid>
        <v-toolbar elevation="0">
          <v-icon class="mr-2" color="#0a7d9a">mdi-calendar</v-icon>
          <div style="max-width:220px">
            <v-select
              autofocus
              flat
              :items="cals"
              item-text="title"
              return-object
              label="Место"
              v-model="events"
              outlined
              dense
              class="pt-7 mr-2"
            ></v-select>
          </div>
          <v-divider vertical />
          <v-btn
            outlined
            @click="setToday"
            class="ml-2"
            elevation="3"
            v-if="!$vuetify.breakpoint.xs"
          >Сегодня</v-btn>
          <v-btn
            @click="prev"
            outlined
            class="ml-2"
            min-width="36px"
            width="36px"
            elevation="3"
            v-if="!$vuetify.breakpoint.xs"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            @click="next"
            outlined
            class="ml-2"
            min-width="36px"
            width="36px"
            elevation="3"
            v-if="!$vuetify.breakpoint.xs"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>

          <v-toolbar-title class="ml-2">{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>

          <div style="max-width:200px">
            <v-select
              v-if="!$vuetify.breakpoint.xs"
              :items="vidi"
              item-text="title"
              return-object
              label="Вид"
              v-model="caltype"
              outlined
              dense
              class="pt-7 mr-2"
              @change="changeView(caltype.value)"
            ></v-select>
          </div>
        </v-toolbar>

        <div class="fill-height">
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
        </div>
      </v-container>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :position-x="cardposX"
        :position-y="cardposY"
        max-width="400px"
        offset-x
      >
        <v-card>
          <v-sheet class="overflow-y-auto" min-width="150px" max-width="400px" max-height="500px">
            <v-card-text>
              <h3>{{selectedEvent.title}}</h3>
              <div v-html="selectedEvent.description"></div>
            </v-card-text>
          </v-sheet>
        </v-card>
      </v-menu>
    </v-content>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { formatDate } from "@fullcalendar/core";

export default {
  components: {
    FullCalendar
  },
  props: ["drawer"],

  watch: {
    drawer() {
      this.drawer2 = !this.drawer2;
    }
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

    drawer2: false,
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

    caltype: {
      title: "МЕСЯЦ",
      value: "dayGridMonth"
    },
    vidi: [
      {
        title: "МЕСЯЦ",
        value: "dayGridMonth"
      },
      {
        title: "НЕДЕЛЯ",
        value: "timeGridWeek"
      },
      {
        title: "ДЕНЬ",
        value: "timeGridDay"
      },
      {
        title: "РАСПИСАНИЕ",
        value: "listMonth"
      }
    ],

    events: {
      title: "СЕТЬ",
      googleCalendarId: "2kpu7kvisrlvmgkiheabippc20@group.calendar.google.com",
      color: "#c5dde8",
      className: "set"
    },

    cals: [
      {
        title: "СЕТЬ",
        googleCalendarId:
          "2kpu7kvisrlvmgkiheabippc20@group.calendar.google.com",
        color: "#c5dde8",
        className: "set"
      },

      {
        title: "МОСКВА",
        googleCalendarId:
          "ct8a4t3tuim1jjnkno2d6skkck@group.calendar.google.com",
        color: "#cde6bb",
        className: "moskva"
      },

      {
        title: "САНКТ-ПЕТЕРБУРГ",
        googleCalendarId:
          "uq550s4cd42vsoojk09patvfvk@group.calendar.google.com",
        color: "#e9ddbb",
        className: "piter"
      }
    ]
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
      if (this.hasOwnProperty("calendarApi")) {
        this.title = this.calendarApi.view.title;
      }
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

    showevent(arg) {
      arg.jsEvent.preventDefault();

      const open = () => {
        this.selectedEvent = arg.event;
        this.selectedEvent.description = arg.event.extendedProps.description;
        this.selectedElement = arg.el;
        this.cardposX = arg.jsEvent.pageX;
        this.cardposY = arg.jsEvent.pageY;

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
    if (this.$route.params.hasOwnProperty('id')) {
      switch(this.$route.params.id){
        case 'set':this.events = this.cals[0];
        break;
        case 'msk':this.events = this.cals[1];
        break;
        case 'spb':this.events = this.cals[2];
      }
      }
    

    this.today = new Date();
    this.focus = dateToYMD(this.today);
    this.calendarApi = this.$refs.fullCalendar.getApi();

    if (window.innerWidth < 700) {
      this.changeView("listMonth");
    }
  }
};

function dateToYMD(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1; // Month from 0 to 11
  const y = date.getFullYear();
  return `${y}-${m <= 9 ? `0${m}` : m}-${d <= 9 ? `0${d}` : d}`;
}
</script>

<style  lang='scss'>
.fc-head {
  background-color: #fcf8e3;
}
.fc-day-header.fc-sat {
  background-color: #f2e1e1;
}
.fc-day-header.fc-sun {
  background-color: #f2e1e1;
}

.cont {
  height: calc(100vh - 64px);
}
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
@import "~@fullcalendar/list/main.css";
</style>
