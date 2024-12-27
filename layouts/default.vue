<template>
  <v-app>
    <v-navigation-drawer width="600" v-model="drawer" :rail="rail" permanent @click="rail = false" app>
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="Emmanuel Harry" nav>
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" flat @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-tabs v-model="tab" bg-color="">
        <v-tab value="one">Api Browser</v-tab>
        <v-tab value="two">Component Browser</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <ApiBrowser />
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          <ComponentBrowser />
        </v-tabs-window-item>
      </v-tabs-window>

    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import ApiBrowser from '~/components/ApiBrowser.vue';
import ComponentBrowser from '~/components/ComponentBrowser.vue';

var tab = ref("one")
var drawer = ref(true)
var rail = ref(true)
</script>

<style></style>