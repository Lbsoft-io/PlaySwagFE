<script setup lang="ts">
import type {Node} from '@vue-flow/core'
import {VueFlow, Panel} from '@vue-flow/core'
import {useUseOpenApiParser} from '~/composables/core/useOpenOpiParser';

const nodes = ref<Node[]>([
  {
    id: '1',
    position: {x: 50, y: 50},
    data: {label: 'Node 1',},
  }
]);


const endpoints = useEndpoints()

await endpoints.loadApis()
console.log(endpoints.groupEndpointsByTag());


</script>

<template>

  <VueFlow :nodes="nodes" dropzone="" @drop.prevent="">

  </VueFlow>

</template>

<style>
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';
</style>
