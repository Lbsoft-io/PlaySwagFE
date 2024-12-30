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
    type: String as PropType<JSONEditorMode>,
    default: 'text' as JSONEditorMode,
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

let editorState = {};

watch(
    () => props.mode,
    async (newMode) => {
      console.log('Mode changesd to', newMode);
      editorState = jsonEditor?.get()
      if (jsonEditor) {
        jsonEditor.destroy(); // Destroy the existing instance
        if (editorContainer.value) {
          const {default: JSONEditor} = await import('jsoneditor');
          jsonEditor = new JSONEditor(editorContainer.value, {
            mode: newMode, // Reinitialize with the new mode
            mainMenuBar: false,
            onEvent: (node, event) => {
              if (event.type === 'click') {
                selectedNode.value = getValueByPath(props.body, node.path);
                emits('node-selected', node);
              }
            },
          });
          jsonEditor.set(editorState); // Reset the body content
        }
      }
    }
);
</script>