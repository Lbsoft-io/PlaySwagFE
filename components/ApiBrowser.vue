<template>
  <v-card width="">
    <v-card-text>
      <v-text-field v-model="searchTerm" append-inner-icon="mdi-magnify" density="compact" variant="outlined"
        name="name" label="Search endpoints" single-line>
      </v-text-field>


    </v-card-text>

    <v-expansion-panels>
      <v-expansion-panel v-for="(endpoints, tag, index) in data" :key="index">
        <v-expansion-panel-title>{{ tag.toString().toLocaleUpperCase() }} - {{ endpoints.length }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-sheet v-for="endpoint in endpoints" color="green-lighten-5" class="rounded my-2">
            <div class="d-flex pa-2">
              <div>
                <v-btn class="text-button" variant="tonal" min-width="90" color="green">{{ endpoint.Method.toUpperCase() }}</v-btn>
              </div>
              <div class="ml-2 mt-2 text-body-1">
                {{ endpoint.Url }}
              </div>
              <div class="ml-2 mt-2 text-caption text-grey">
               {{ endpoint.Summary }}
              </div>
            </div>
          </v-sheet>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-card>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'

var searchTerm = ref("")
var drag = ref(false)

const endpoints = useEndpoints()

await endpoints.loadApis()
let data = endpoints.groupEndpointsByTag()

function dragStart(evt: DragEvent, Id: string) {
  evt.dataTransfer?.setData("payload", Id)
  console.log(evt)
}





</script>

<style></style>