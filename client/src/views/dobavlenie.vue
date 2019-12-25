<template>
  <div class="fill-height">
    <appbar v-on:toggle-drawer="drawer=!drawer">
      <h2 class="pl-2">Добавление мероприятия</h2>
      <v-spacer></v-spacer>
    </appbar>

    <v-content class="fill-height">
      <v-container>
        <v-card>
          <v-card-title>Добавление мероприятия с timepad</v-card-title>
          <v-card-text>
            <v-text-field v-model="org" label="Организатор"></v-text-field>
            <v-btn @click="get">click</v-btn>
          </v-card-text>
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  data: () => ({
    org: "",
    drawer: true
  }),
  methods: {
    get(arg) {
      const requestUrl = `https://api.timepad.ru/v1/events?organization_ids=${this.org}`;
      // var requestUrl = "https://api.timepad.ru/v1/events/1124163";
      const req = new XMLHttpRequest();
      req.open("GET", requestUrl, true);
      req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4) {
          if (req.status == 200) {
            const result = JSON.parse(req.responseText);
            console.log(result);
          } else {
          }
        }
      };
      req.send(null);
    }
  }
};
</script>

<style>
</style>
