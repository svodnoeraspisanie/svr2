<template>
  <v-app-bar
    clipped-left
    app
    
    
  
  >


    <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon>

    <v-toolbar-title width="280px">
      <span class="hidden-sm-and-down">
        <router-link to="/" class="toolbar-title">Свора</router-link>
      </span>
    </v-toolbar-title>

    <v-spacer/>

    <slot class="mx-1"></slot>

    
<v-spacer/>
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
