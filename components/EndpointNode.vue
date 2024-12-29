<template>
  <div class="d-flex flex-column">
    <div style="width: 100%;">
      <v-spacer></v-spacer>
      <v-btn variant="flat" density="compact" class="my-1" icon="mdi-arrow-all"></v-btn>
    </div>

    <v-card @mousedown.stop min-width="800" max-width="600" class="">
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

          </div>
        </div>
      </v-sheet>

      <v-card-text class="red--text font-weight-light">
        {{ endpointData?.Description || "No description" }}
      </v-card-text>

      <v-card-text class="red--text font-weight-light">
        <EnpointNodeParameterParser :params="endpointData.Parameters" v-if="endpointData?.Parameters.length != 0" />
        <EndpointNodeBodyParser :body="endpointData.Body" v-if="endpointData?.Body" />
        <JsonEditor :mode="'text'" :body="endpointData.ResponseExample" v-if="endpointData?.ResponseExample" />
        <!--      {{ endpointData.ResponseExample }}-->
      </v-card-text>

      <v-card-text>
        <v-sheet class="bg-grey-lighten-5 pa-3">
          <div class="ml-1 text-caption">Response codes</div>
          <v-chip rounded="sm" density="compact" class="ma-1" variant="tonal" v-for="status in endpointData?.ResponseStatusCodes" :key="status">
            {{ status }}
          </v-chip>
        </v-sheet>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn density="compact" variant="tonal" color="red" icon="mdi-delete"></v-btn>
        <v-btn density="compact" variant="tonal" color="green" icon="mdi-play"></v-btn>
      </v-card-actions>

      <Handle type="source" id="port-out-1" :position="Position.Bottom" />
      <Handle type="target" id="port-in-1" :position="Position.Right" />
    </v-card>
  </div>

</template>
<script setup lang="ts">
import {Handle, Position, useVueFlow} from '@vue-flow/core'
import {useEndpoints} from "~/stores/endpoints";
import type {Endpoint} from '~/core/core/ApiFormats';
import EndpointNodeBodyParser from "~/components/endpoint-node-objects/BodyViewer.vue";
import EnpointNodeParameterParser from "~/components/endpoint-node-objects/ParameterViewer.vue";
import JsonEditor from "~/components/third-party-wrappers/JsonEditor.vue";

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