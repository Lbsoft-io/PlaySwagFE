<template>
  <div>
    <div ref="editorContainer" style="height: 400px;"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import 'jsoneditor/dist/jsoneditor.css';
import type JSONEditor from "jsoneditor";
import type {EditableNode, JSONEditorMode} from "jsoneditor";
import {getValueByPath} from "~/core/utilities/JsonUtils";

let props = defineProps({
  body: {
    type: Object,
    required: true,
  },
  mode: {
    type: String as () => JSONEditorMode,
    default: 'tree',
  }
})

let emits = defineEmits<{
  (e: 'node-selected', node: EditableNode): void;
}>()

let selectedNode = ref({})

const editorContainer = ref<HTMLDivElement | null>(null);
let jsonEditor: JSONEditor | null = null;

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const {default: JSONEditor} = await import('jsoneditor');
    jsonEditor = new JSONEditor(editorContainer.value!, {
      mode: props.mode,
      mainMenuBar: false,
      onEvent: (node, event) => {
        if (event.type === 'click') {
          selectedNode.value = getValueByPath(props.body, node.path);
          emits('node-selected', node);
        }
      },
    });
    jsonEditor.set(props.body);
  }
});

onUnmounted(() => {
  jsonEditor?.destroy(); // Clean up the editor instance
});
</script>