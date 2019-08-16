<template>

<v-container fill-height fluid pa-0 ma-0 pt-2 >
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


  <v-layout  >


    <v-flex >

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

    today: '2019-01-08',
    focus: '2019-01-08',
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
    events: [
      {
        name: 'Русское народное пение: традиция и импровизация',
        details: 'Описание: <br> https://slovo-vdnh.timepad.ru/event/1025381/ <br> Покосные, свадебные, бурлацкие, разбойничьи, казачьи — лишь несколько жанров русской народной песни, о которых мы все кое-что слышали. А как звучат «подблюдные», «волочебные», «купальские» песни? Откуда произошли «небылицы» и почему частушки, которые известны нам как веселые песни, называли иногда «страданиями»? <br>Филолог и этнограф Александр Маточкин, который двадцать лет собирает, сказывает эпос и поет традиционный фольклор по всей России, устроит встречу в центре «Слово» на ВДНХ. Мы будем не только слушать авторское пропевание русских песен под импровизации гармони, но и сами научимся правильно исполнять хором «хиты» казачьего фольклора с ведущим певцом.<br>Александр Маточкин — бакалавр лингвистики, магистр филологии, автор научных работ по фольклористике. С фольклорно-этнографическими экспедициями неоднократно ездит по деревням Архангельской, Вологодской и других областей России около 20 лет.  Русским народным пением Александр занимается с 1998, в том числе в составе ведущих фольклорных ансамблей Санкт-Петербурга. Участник и лауреат многих фольклорных фестивалей и конкурсов, создатель культурно-просветительского ВК-сообщества по традиционной русской культуре «Ладно-Хорошо» (более 34 тысяч подписчиков). С 2013 проводит лекции и встречи-беседы со сказыванием русских старин и фольклорным пением.',
        start: '2019-01-01',
        end: '2019-01-01',
        color: 'blue',

      },
      {
        name: 'Meeting',
        details: 'Spending time on how we do not have enough time',
        start: '2019-01-07 09:00',
        end: '2019-01-07 09:30',
        color: 'indigo',
      },
      {
        name: 'Large Event',
        details: 'This starts in the middle of an event and spans over multiple events',
        start: '2018-12-31',
        end: '2019-01-04',
        color: 'deep-purple',
      },
      {
        name: '3rd to 7th',
        details: 'Testing',
        start: '2019-01-03',
        end: '2019-01-07',
        color: 'cyan',
      },
      {
        name: 'Big Meeting',
        details: 'A very important meeting about nothing',
        start: '2019-01-07 08:00',
        end: '2019-01-07 11:30',
        color: 'red',
      },
      {
        name: 'Another Meeting',
        details: 'Another important meeting about nothing',
        start: '2019-01-07 10:00',
        end: '2019-01-07 13:30',
        color: 'brown',
      },
      {
        name: '7th to 8th',
        start: '2019-01-07',
        end: '2019-01-08',
        color: 'blue',
      },
      {
        name: 'Lunch',
        details: 'Time to feed',
        start: '2019-01-07 12:00',
        end: '2019-01-07 15:00',
        color: 'deep-orange',
      },
      {
        name: '30th Birthday',
        details: 'Celebrate responsibly',
        start: '2019-01-03',
        color: 'teal',
      },
      {
        name: 'New Year',
        details: 'Eat chocolate until you pass out',
        start: '2019-01-01',
        end: '2019-01-02',
        color: 'green',
      },
      {
        name: 'Conference',
        details: 'The best time of my life',
        start: '2019-01-21',
        end: '2019-01-28',
        color: 'grey darken-1',
      },
      {
        name: 'Hackathon',
        details: 'Code like there is no tommorrow',
        start: '2019-01-30 23:00',
        end: '2019-02-01 08:00',
        color: 'black',
      },
      {
        name: 'event 1',
        start: '2019-01-14 18:00',
        end: '2019-01-14 19:00',
        color: '#4285F4',
      },
      {
        name: 'event 2',
        start: '2019-01-14 18:00',
        end: '2019-01-14 19:00',
        color: '#4285F4',
      },
      {
        name: 'event 5',
        start: '2019-01-14 18:00',
        end: '2019-01-14 19:00',
        color: '#4285F4',
      },
      {
        name: 'event 3',
        start: '2019-01-14 18:30',
        end: '2019-01-14 20:30',
        color: '#4285F4',
      },
      {
        name: 'event 4',
        start: '2019-01-14 19:00',
        end: '2019-01-14 20:00',
        color: '#4285F4',
      },
      {
        name: 'event 6',
        start: '2019-01-14 21:00',
        end: '2019-01-14 23:00',
        color: '#4285F4',
      },
      {
        name: 'event 7',
        start: '2019-01-14 22:00',
        end: '2019-01-14 23:00',
        color: '#4285F4',
      },
    ],
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
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10];
    },
  },


};
</script>

<style >


.v-calendar .v-event.v-event-start{
  margin-left:5px;
}
</style>
