<template>
  <v-app-bar
    clipped-left
    app
    elevation="1"
    :width=" $vuetify.breakpoint.xs? '100%' : '299px'"
    :height=" $vuetify.breakpoint.xs? '50px' : '161px'"
  >
    <v-list width="100%" class="py-0">
      <v-list-item to="/" class="pa-0 ma-0 d-none d-sm-flex" active-class="act">
        <v-list-item-content>
          <v-img src="/rakitovkust.png" ></v-img>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="d-sm-flex" />

      <v-toolbar dense class="px-3 py-0" elevation="3">


        <v-tooltip bottom v-if="$vuetify.breakpoint.xs">
          <template v-slot:activator="{ on }">
            <v-btn icon to="/" v-on="on">
              <v-icon>mdi-view-dashboard</v-icon>
            </v-btn>
          </template>
          <span>Статьи</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon to="/statii" v-on="on">
              <v-icon>mdi-book-open</v-icon>
            </v-btn>
          </template>
          <span>Статьи</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon to="/predpriyatiya" exact v-on="on">
              <v-icon>mdi-account-group</v-icon>
            </v-btn>
          </template>
          <span>Предприятия</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon to="/sbori" v-on="on">
              <v-icon>mdi-cash-multiple</v-icon>
            </v-btn>
          </template>
          <span>Сборы средств</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon to="/sobitiya" v-on="on">
              <v-icon>mdi-calendar</v-icon>
            </v-btn>
          </template>
          <span>События</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon to="/prisoedinitsya" v-on="on">
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-btn>
          </template>
          <span>Присоединиться</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon to="/spravka" v-on="on">
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>Ответы на вопросы</span>
        </v-tooltip>
      </v-toolbar>
    </v-list>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped>
::v-deep .v-toolbar__content {
  padding: 0px;
  height: 100% !important;
}
.theme--light.v-list-item--active:before, .theme--light.v-list-item--active:hover:before, .theme--light.v-list-item:focus:before{
  opacity:0;
}

</style>
