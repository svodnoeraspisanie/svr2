<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    dark
    src="https://picsum.photos/id/466/1920/1080"
    color="#fcb69f"
  >
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
    </template>

    <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <span class="hidden-sm-and-down">
        <router-link to="/" class="toolbar-title">Свора</router-link>
      </span>
    </v-toolbar-title>

    <v-tooltip bottom >
      <template v-slot:activator="{ on }">
        <v-btn icon to="/predpriyatiya" v-on="on">
          <v-icon>mdi-account-badge-horizontal-outline</v-icon>
        </v-btn>
      </template>
      <span>Список предприятий</span>
    </v-tooltip>

 <v-tooltip bottom >
      <template v-slot:activator="{ on }">
    <v-btn icon to="/sbori" v-on="on">
      <v-icon>mdi-cash-100</v-icon>
    </v-btn>
    </template>
      <span>Сборы средств</span>
    </v-tooltip>

<v-tooltip bottom >
      <template v-slot:activator="{ on }">
    <v-btn icon to="/raspisanie" v-on="on">
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
        </template>
      <span>Расписание событий</span>
    </v-tooltip>

    <v-divider vertical class="mx-1" />
    <v-divider vertical class="mx-1" />

    <slot class="mx-1"></slot>

    <v-divider vertical class="mx-1" />
    <v-divider vertical class="mx-1" />

<v-tooltip bottom >
      <template v-slot:activator="{ on }">
    <v-btn icon to="/spravka" v-on="on">
      <v-icon>mdi-account</v-icon>
    </v-btn>
       </template>
      <span>Учётная запись</span>
    </v-tooltip>

<v-tooltip bottom >
      <template v-slot:activator="{ on }">
    <v-btn icon to="/spravka" v-on="on">
      <v-icon>mdi-help</v-icon>
    </v-btn>
           </template>
      <span>Справка</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
