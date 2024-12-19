<template>
  <v-container class="py-4">
    <!-- Search Bar -->
    <v-row justify="center">
      <v-col cols="12">
        <v-text-field
            v-model="searchTerm"
            append-inner-icon="mdi-magnify"
            density="compact"
            variant="solo"
            label="Search endpoints"
            single-line
            class="elevation-0"
        />
        {{dnd.isDragging}}
      </v-col>
    </v-row>

    <!-- Expansion Panels for Endpoints -->
    <v-row justify="center">
      <v-col cols="12">
        <v-expansion-panels elevation="0">
          <!-- Render panels by tag -->
          <v-expansion-panel v-for="(endpoints, tag, index) in filteredData" :key="index">
            <v-expansion-panel-title>
              <div style="width: 95%;" class="d-flex justify-space-between">
                <span class="text-body-1 font-weight-bold">
                  {{ (tag as string).toUpperCase() }}
                </span>
                <span class="text-caption grey--text mt-0 ml-5">
                  {{ endpoints.length }} endpoints
                </span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- Render individual endpoints -->
              <v-row dense>
                <v-col
                    v-for="endpoint in endpoints"
                    :key="endpoint.OperationId"
                    cols="12"
                >
                  <v-sheet
                      :color="getMethodColor(endpoint.Method)+'-lighten-5'"
                      class="rounded pa-3 d-flex align-center draggable-item"
                      draggable="true"
                      @dragstart="dragStart($event, endpoint.OperationId)"
                  >
                    <v-btn
                        :color="getMethodColor(endpoint.Method)"
                        class="text-button"
                        variant="tonal"
                        small
                        width="100"

                    >
                      {{ endpoint.Method.toUpperCase() }}
                    </v-btn>
                    <div class="ml-3 flex-grow-1">
                      <div class="text-body-2 font-weight-medium">
                        {{ endpoint.Url }}
                      </div>
                      <div class="text-caption grey--text">
                        {{ endpoint.Summary || "No summary available" }}
                      </div>
                      <div>
<!--                        {{endpoint.Body || endpoint.Parameters }}-->
                      </div>
                    </div>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import type { Endpoint } from "~/core/core/ApiFormats";
import {useDragAndDrop} from "~/stores/drag-and-drop";

const searchTerm = ref("");
const endpoints = useEndpoints();
const dnd = useDragAndDrop();

// Load endpoints and group them by tag
await endpoints.loadApis();
let data = endpoints.groupEndpointsByTag();

// Filtered data based on search term
const filteredData = computed(() => {
  if (!searchTerm.value) return data;

  const filtered: Record<string, Endpoint[]> = {};
  
  for (const [tag, endpoints] of Object.entries(data)) {
    const matches = endpoints.filter((endpoint) =>
        endpoint.Url.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
    if (matches.length) {
      filtered[tag] = matches;
    }
  }
  return filtered;
});

// Drag event handler
function dragStart(evt: DragEvent, id: string) {
  dnd.dragStart(evt, id)
}

// Function to get colors based on HTTP method type
function getMethodColor(method: string): string {
  switch (method.toUpperCase()) {
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
.v-expansion-panel-title {
  padding: 0.75rem 1rem;
}

.v-expansion-panel-text {
  padding: 1rem;
}

.v-sheet {
  cursor: grab;
  transition: box-shadow 0.3s ease;
}

.v-sheet:hover {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

.draggable-item {

  user-select: none; /* Prevent text selection */
  cursor: grab;
}

.draggable-item:active {
  cursor: grabbing;
}
</style>
