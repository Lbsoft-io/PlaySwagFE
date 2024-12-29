<script setup lang="ts">

import JsonEditor from "~/components/third-party-wrappers/JsonEditor.vue";
import type {EditableNode} from "jsoneditor";
import {getValueByPath} from "~/core/utilities/JsonUtils";

var props = defineProps({
  body: {
    type: Object,
    required: true,
  }
})

var selectedNode = ref({})

function nodeSelected(node: EditableNode) {
  selectedNode.value = getValueByPath(props.body, node.path);
}

</script>

<template>
<v-card variant="outlined" class="mt-2">
  <v-card-title>
    Request Viewer: {{ selectedNode }}
  </v-card-title>
  <JsonEditor :mode="tree" @node-selected="nodeSelected" :body="body" />
</v-card>
</template>
