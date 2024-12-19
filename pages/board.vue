<template>

   <VueFlow
       :nodes="nodes"
       dropzone=""
       @drop="handleDrop"
       @dragover="onDragOver"
   >
     <Background :size="2" :gap="20" />
     <template #node-endpoint-node="props">
        <EndpointNode :id="props.id" :data="props.data" />
     </template>
   </VueFlow>

</template>


<script setup lang="ts">
import type {Node} from '@vue-flow/core'
import {VueFlow} from '@vue-flow/core'
import {useDragAndDrop} from "~/stores/drag-and-drop";
import {Background} from '@vue-flow/background'
import EndpointNode from "~/components/EndpointNode.vue";

const nodes = ref<Node[]>([
  {
    id: '1',
    position: {x: 0, y: 0},
    data: {label: 'Node 1',},
    type: 'endpoint-node',
  }
]);

const endpoints = useEndpoints()
const dnd = useDragAndDrop();

await endpoints.loadApis()

const dropHandler = dnd.handleDrop

const onDragOver = (event: DragEvent, args: any) => {
  event.preventDefault();
};

const handleDrop = (event: DragEvent, args: any) => dropHandler(event, nodes.value)
</script>

<style>
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';
</style>
