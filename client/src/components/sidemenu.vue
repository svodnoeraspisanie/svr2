<template>
  <v-navigation-drawer 
  width="400px"
  permanent clipped app  >
      <v-list
          
          
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <slot :name=item.slotname></slot>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      
    </v-navigation-drawer>
</template>

<script>
export default {
data () {
      return {
        items: [
          { title: 'Сводка', icon: 'mdi-view-dashboard',to:"/", slotname:"default" },
          { title: 'Список предприятий', icon: 'mdi-account-badge-horizontal-outline',to:"/predpriyatiya",slotname:"pr" },
          { title: 'Сборы средств', icon: 'mdi-cash-100',to:"/sbori",slotname:"sb"  },
          { title: 'Расписание событий', icon: 'mdi-calendar',to:"/raspisanie",slotname:"rp" },
        ],
      }
    },
}
</script>

<style scoped>

</style>