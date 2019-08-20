<template>

<v-container  fluid pa-0 ma-0 style="height:100%;"  >
 <v-navigation-drawer
      :v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
    app
        width="300px"
    >
    <v-list>
<v-list-item>
<v-date-picker first-day-of-week="1" locale="ru" no-title class="elevation-0"></v-date-picker>
</v-list-item>

             <v-list-item>
               <v-divider> </v-divider>

   <span>{{ title }}</span>

 </v-list-item>

               <v-list-item>
<v-btn outlined class="mr-4" @click="setToday">
            Сегодня
          </v-btn>

          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
           </v-list-item>


 <v-list-item>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                v-on="on"
              >
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

 </v-list-item>
        <v-list-item>


          <v-list-item-title class="title">
            Город:
          </v-list-item-title>

               <v-select
          :items="city"

        ></v-select>
              </v-list-item>

        <v-list-item>

        <v-list-item-content>


          <v-list-item-title class="title">
            Метки:
          </v-list-item-title>

                <v-flex
          v-for="(selection, i) in selections"
          :key="selection.text"
          shrink
        >
          <v-chip
            :disabled="loading"
            close
            @click:close="selected.splice(i, 1)"
          >
            <v-icon
              left
              v-text="selection.icon"
            ></v-icon>
            {{ selection.text }}
          </v-chip>
        </v-flex>

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
            <v-icon
              :disabled="loading"
              v-text="item.icon"
            ></v-icon>
          </v-list-item-avatar>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list>

    </v-list-item-content>
      </v-list-item>
      </v-list>
    </v-navigation-drawer>

<v-layout  style="height:90%;">
     
    <v-divider vertical ></v-divider>
    <v-flex  >
       <v-toolbar flat color="white" style="padding-left:300px;">
          <v-btn outlined class="mr-4" @click="setToday">
            Сегодня
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                v-on="on"
              >
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
        </v-toolbar>
        <v-divider  ></v-divider>

        <v-calendar

          ref="calendar"
          v-model="focus"
          color="primary"

          :weekdays="[1,2,3,4,5,6,0]"
          :shortMonths= false
          :shortWeekdays=false
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        >
        
        
        </v-calendar>

        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            max-width="800px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
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
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Закрыть
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

    </v-flex>
  </v-layout>


      </v-container>

</template>

<script>

export default {

  data: () => ({

    today: '2019-08-19',
    focus: '2019-08-19',
    type: 'month',
    typeToLabel: {
      'month': 'Месяц',
      'week': 'Неделя',
      'day': 'День',
      '4day': '4 дня',
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    ev2:[],
    events: [],
  }),
  computed: {

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
          return `${startMonth} ${startYear}`;
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return '';
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      });
    },
  },
  methods: {
    async zagruzkaraspisaniya (mesto){

      var url="https://calendar.google.com/calendar/ical/ct8a4t3tuim1jjnkno2d6skkck%40group.calendar.google.com/public/basic.ics";

      let response = await fetch(url);
      if (response.ok) {
      var data = await response.text();
      
      var jcalData = ICAL.parse(data);
      var vcalendar = new ICAL.Component(jcalData);
      let novsob ={}
      for (let sob=0; sob < vcalendar.jCal[2].length;sob++){
          novsob = {};
          novsob.name=vcalendar.jCal[2][sob][1][10][3];
          novsob.details=vcalendar.jCal[2][sob][1][5][3];
          
          let start = new Date(vcalendar.jCal[2][sob][1][0][3]);
          novsob.start=start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate()+' '+start.getHours()+':'+start.getMinutes();
          
          let end = new Date(vcalendar.jCal[2][sob][1][1][3]);
          novsob.end=end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate()+' '+end.getHours()+':'+end.getMinutes();
          novsob.color= 'light-blue';

          
          this.events.push(novsob);

        }
     console.log(this.events);

      

  }
    

  throw new Error(response.status);


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
        setTimeout(() => this.selectedOpen = true, 10);
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
        : ['-ео', '-ое', '-ое', '-е', '-ое', '-ое', '-ое', '-ое', '-ое', '-ое'][d % 10];
    },
  },

mounted() {
    this.zagruzkaraspisaniya ("mesto");
    this.updateRange(null,null);
    
  }
};
</script>

<style >


.v-calendar .v-event.v-event-start{
  margin-left:5px;
}
</style>
