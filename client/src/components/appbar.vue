<template>
<v-app-bar
                    :clipped-left="$vuetify.breakpoint.lgAndUp"
                    app
                    dark
                    src="https://picsum.photos/id/466/1920/1080"
                    color="#fcb69f"
                    collapse
                    min-width="300"
                    
                >
                    <template v-slot:img="{ props }">
                        <v-img
                            v-bind="props"
                            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
                        ></v-img>
                    </template>

<v-app-bar-nav-icon
                            @click.stop="$emit('toggle-drawer')"
                        ></v-app-bar-nav-icon>

                    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                        
                        <span class="hidden-sm-and-down"><router-link to="/"  class="toolbar-title">Свора </router-link></span>
                    </v-toolbar-title>

                    <v-toolbar-items>
                        <v-btn text 
                        to="/"
                        >
                            Свора</v-btn>

                        
                        
                    </v-toolbar-items>
                    <v-btn icon 
                        to="/predpriyatiya"
                        >
                            <v-icon 
                                >mdi-account-badge-horizontal-outline</v-icon
                            ></v-btn
                        >
                        <v-btn icon
                        to="/raspisanie">
                            <v-icon >mdi-calendar</v-icon></v-btn
                        >
                        <v-btn icon
                        to="/">
                            <v-icon >mdi-help</v-icon></v-btn
                        >
                </v-app-bar>
    
</template>

<script>
export default {

}
</script>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>