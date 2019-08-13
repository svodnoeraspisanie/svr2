<template>
<v-app-bar
                    :clipped-left="$vuetify.breakpoint.lgAndUp"
                    app
                    dark
                    src="https://picsum.photos/id/466/1920/1080"
                    color="#fcb69f"
                >
                    <template v-slot:img="{ props }">
                        <v-img
                            v-bind="props"
                            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
                        ></v-img>
                    </template>

                    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                        <v-app-bar-nav-icon
                            @click.stop="drawer = !drawer"
                        ></v-app-bar-nav-icon>
                        <span class="hidden-sm-and-down"><router-link to="/"  class="toolbar-title">Свора</router-link></span>
                    </v-toolbar-title>

                    <v-toolbar-items>
                        <v-btn text 
                        to="/predpriyatiya"
                        >
                            <v-icon left
                                >mdi-account-badge-horizontal-outline</v-icon
                            >Предприятия</v-btn
                        >
                        <v-btn text
                        to="/raspisanie">
                            <v-icon left>mdi-calendar</v-icon>Расписание</v-btn
                        >
                        <v-btn text>
                            <v-icon left>mdi-android-messages</v-icon
                            >Сообщения</v-btn
                        >
                    </v-toolbar-items>
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