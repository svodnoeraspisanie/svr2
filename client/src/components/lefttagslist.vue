<template>
     <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
        width="300px"
    >


             <v-list-item>

        <v-list-item-content>


          <v-list-item-title class="title">
            Город:
          </v-list-item-title>

               <v-select
          :items="city"

        ></v-select>
              </v-list-item-content>
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
    </v-navigation-drawer>
</template>

<script>
export default {

};
</script>
