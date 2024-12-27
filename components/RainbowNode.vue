<template>
  <div class="rainbow-node">
    <div class="rainbow-circle">
      <span class="node-label">{{ data.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimatedRainbowNode",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.rainbow-node {
  position: relative;
  width: 100px;
  height: 100px;
}

.rainbow-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(
      red,
      orange,
      yellow,
      green,
      blue,
      indigo,
      violet,
      red
  );
  animation: spin 100s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.node-label {
  font-size: 14px;
  font-weight: bold;
  color: white;
  text-align: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
