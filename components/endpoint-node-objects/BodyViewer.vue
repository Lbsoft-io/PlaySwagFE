<script setup lang="ts">
import JsonEditor from "~/components/third-party-wrappers/JsonEditor.vue";
import type { EditableNode, JSONEditorMode } from "jsoneditor";
import {
  getValueByPath,
  extractExampleBody,
  getRequestBodyFromBodySchema,
} from "~/core/utilities/JsonUtils";

const props = defineProps({
  body: {
    type: Object,
    required: true,
  },
});

const selectedNode = ref({});
const viewMode = ref<JSONEditorMode>("text");
const viewModes: JSONEditorMode[] = ["tree", "view", "form", "code", "text", "preview"];

const exampleBody = getRequestBodyFromBodySchema(props.body);

function nodeSelected(node: EditableNode) {
  selectedNode.value = getValueByPath(props.body, node.path);
}
</script>

<template>
  <v-card variant="outlined" class="my-4 elevation-1">
    <!-- Header section with editor label and mode selector -->
    <v-sheet height="60" class="pa-3 d-flex justify-space-between bg-light text-body-2">
      <div class="font-weight-medium mt-2">Body Editor</div>
      <div class="font-weight-medium ma-0 pa-0">
        <v-select
            variant="outlined"
            density="compact"
            v-model="viewMode"
            :items="viewModes"
            label="View Mode"
        ></v-select>
      </div>
    </v-sheet>

    <!-- JSON Editor -->
    <v-divider></v-divider>
    <div class="">
      <JsonEditor :mode="viewMode" @node-selected="nodeSelected" :body="exampleBody" />
    </div>
  </v-card>
</template>

<style scoped>
.bg-light {
  background-color: #f9f9f9;
}

.w-40 {
  width: 40%;
}

.font-weight-medium {
  font-weight: 500;
}

.text-body-2 {
  font-size: 0.875rem;
  color: #444;
}
</style>
