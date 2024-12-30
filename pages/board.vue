<template>
  <VueFlow
      :edges="edges"
      @drop="handleDrop"
      @dragover="onDragOver"
      @connect="onConnect"
      fit-view
      :zoomOnScroll="zoomEnabled"
      :zoomOnPinch="zoomEnabled"
      :zoomOnDoubleClick="true"
      :defaultViewport="{ zoom: 1, x: 0, y: 0 }"
      :defaultEdgeOptions = "{type: 'custom'}"
      snap-to-grid
      @nodeMouseEnter="handleNodeMouseEnter"
      @nodeMouseLeave="handleNodeMouseLeave"
  >
    <Background :size="2" :gap="20"/>

      <!-- Custom Node Templates -->
      <template #node-endpoint-node="props">
        <EndpointNode :id="props.id" :data="props.data"/>
      </template>

      <template #node-rainbow-node="props">
        <RainbowNode :id="props.id" :data="props.data"/>
      </template>

      <!-- Custom Edge Template -->
      <template #edge-custom="{ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, source, target, id, data }">
        <GreenRiverFlowEdge
            :source-x="sourceX"
            :source-y="sourceY"
            :target-x="targetX"
            :target-y="targetY"
            :source-position="sourcePosition"
            :target-position="targetPosition"
            :source="source"
            :target="target"
            :id="id"
            :data="data"
        />
      </template>

      <!-- Connection Line Template -->
      <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
        <GreenRiverFlowLine
            :source-x="sourceX"
            :source-y="sourceY"
            :target-x="targetX"
            :target-y="targetY"
        />
      </template>
    </VueFlow>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type {Node, Edge} from '@vue-flow/core'
import {VueFlow, useVueFlow} from '@vue-flow/core';
import {Background} from '@vue-flow/background';
import EndpointNode from '~/components/EndpointNode.vue';
import RainbowNode from '~/components/RainbowNode.vue';
import GreenRiverFlowEdge from '~/components/edges/GreenRiverFlowEdge.vue';
import GreenRiverFlowLine from '~/components/connection-lines/GreenRiverFlowLine.vue';
import {useDragAndDrop} from '~/stores/drag-and-drop';

let nodes = reactive<Node[]>([]);

let edges = ref<Edge[]>([]);

// Define custom edge types
const edgeTypes = {
  custom: GreenRiverFlowEdge,
};

// VueFlow hooks
const {onConnect, addEdges, getNodes} = useVueFlow({
  id: 'vue-store',
});

// Handle new edge connections
onConnect((connection) => {
  console.log('Connection:', connection);
  addEdges(connection);
});

// Drag-and-Drop Logic
const endpoints = useEndpoints();
const dnd = useDragAndDrop();

await endpoints.loadApis();

const dropHandler = dnd.handleDrop;

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (event: DragEvent) => {
  dropHandler(event, nodes);
};

const zoomEnabled = ref(true); // Controls zooming state

function handleNodeMouseEnter() {
  zoomEnabled.value = false; // Disable zooming when mouse is over a node
}

function handleNodeMouseLeave() {
  zoomEnabled.value = true; // Re-enable zooming when mouse leaves a node
}
</script>

<style>
/* Necessary styles for VueFlow */
@import '@vue-flow/core/dist/style.css';

/* Optional default theme styles */
@import '@vue-flow/core/dist/theme-default.css';
</style>
