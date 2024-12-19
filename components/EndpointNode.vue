<template>
  <v-card min-width="200" max-width="400" class="">
    <v-sheet
        :color="getMethodColor(endpointData?.Method)+'-lighten-5'"
        class="rounded pa-3 d-flex align-center"
    >
      <v-btn
          :color="getMethodColor(endpointData?.Method)"
          class="text-button"
          variant="tonal"
          small
          width="100"

      >
        {{ endpointData?.Method.toUpperCase() }}
      </v-btn>
      <div class="ml-3 flex-grow-1">
        <div class="text-body-2 font-weight-medium">
          {{ endpointData?.Url }}
        </div>
        <div class="text-caption grey--text">
          {{ endpointData?.Summary || "No summary available" }}
        </div>
        <div>
          <!--                        {{endpoint.Body || endpoint.Parameters }}-->
        </div>
      </div>
    </v-sheet>

    <v-card-text class="red--text font-weight-light">
      {{ endpointData?.Description }}
    </v-card-text>

    <v-card-text class="red--text font-weight-light">
      {{ endpointData }}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn density="compact" variant="tonal" color="red" icon="mdi-delete"></v-btn>
      <v-btn density="compact" variant="tonal" color="green" icon="mdi-play"></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import {Handle, Position, useVueFlow} from '@vue-flow/core'
import {useEndpoints} from "~/stores/endpoints";
import type {Endpoint} from '~/core/core/ApiFormats';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const {getEndpointByOperationId} = useEndpoints()
const {updateNodeData, getConnectedEdges} = useVueFlow()

let endpointData = getEndpointByOperationId(props.data.label) as Endpoint

function getMethodColor(method: string): string {
  switch (method?.toUpperCase()) {
    case "GET":
      return "blue"; // Blue for GET
    case "POST":
      return "green"; // Green for POST
    case "PUT":
      return "orange"; // Orange for PUT
    case "DELETE":
      return "red"; // Red for DELETE
    case "PATCH":
      return "purple"; // Purple for PATCH
    default:
      return "grey"; // Default color for other methods
  }
}

</script>
<style scoped>

</style>