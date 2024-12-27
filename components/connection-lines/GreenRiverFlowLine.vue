<template>
  <svg :width="width" :height="height" :style="style" xmlns="http://www.w3.org/2000/svg">
    <!-- Define the path -->
    <path
        :d="path"
        fill="none"
        stroke="#000"
        stroke-width="2"
        stroke-dasharray="5 5"
    />
    <!-- Add animated "packet" -->
    <circle r="5" fill="blue">
      <animateMotion
          repeatCount="indefinite"
          dur="2s"
          :path="path"
      />
    </circle>
  </svg>
</template>

<script>
export default {
  props: {
    sourceX: Number,
    sourceY: Number,
    targetX: Number,
    targetY: Number,
    sourcePosition: String,
    targetPosition: String
  },
  computed: {
    // Calculate the SVG path for the connection line
    path() {
      return `M ${this.sourceX},${this.sourceY} C ${
          this.sourceX + (this.targetX - this.sourceX) / 2
      },${this.sourceY} ${this.sourceX + (this.targetX - this.sourceX) / 2},${
          this.targetY
      } ${this.targetX},${this.targetY}`;
    },
    // Width and height of the SVG
    width() {
      return Math.abs(this.targetX - this.sourceX);
    },
    height() {
      return Math.abs(this.targetY - this.sourceY);
    },
    // Style to position the SVG correctly
    style() {
      return {
        position: "absolute",
        left: `${Math.min(this.sourceX, this.targetX)}px`,
        top: `${Math.min(this.sourceY, this.targetY)}px`,
        pointerEvents: "none",
        overflow: "visible",
      };
    },
  },
};
</script>

<style scoped>
/* Optional styling */
</style>
