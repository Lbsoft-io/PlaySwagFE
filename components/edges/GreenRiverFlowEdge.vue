<template>
  <g>
    <!-- Main path of the edge -->
    <path
        :d="edgePath"
        fill="none"
        stroke="#ddd"
        stroke-width="2"
    />
    <!-- Green circle that moves along the path -->
    <circle
        :cx="animatedPosition.x"
        :cy="animatedPosition.y"
        r="5"
        fill="green"
    />
  </g>
</template>

<script setup lang="ts">
import {getBezierPath, type Position} from "@vue-flow/core";
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

// Props definition
interface CustomEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
}

const props = defineProps<CustomEdgeProps>();

// Reactive state
const animationProgress = ref(0); // Progress from 0 to 1
let intervalId: number | null = null; // Store interval ID for cleanup

// Computed edge path using VueFlow's helper function
const edgePath = computed(() => {
  return getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
  })[0];
});

// Computed animated circle position based on progress
const animatedPosition = computed(() => {
  const pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
  );
  pathElement.setAttribute("d", edgePath.value);

  const pathLength = pathElement.getTotalLength();
  const point = pathElement.getPointAtLength(animationProgress.value * pathLength);

  return { x: point.x, y: point.y };
});

// Animation loop
const animate = () => {
  intervalId = window.setInterval(() => {
    animationProgress.value += 0.01;
    if (animationProgress.value > 1) {
      animationProgress.value = 0; // Restart the animation
    }
  }, 16); // Update ~60 FPS
};

// Lifecycle hooks for setup/cleanup
onMounted(() => {
  animate();
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
