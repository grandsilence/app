<template>
  <div class="progress" :class="[value === null ? 'indeterminate' : 'determinate']">
    <span
      class="progress-inner"
      :style="{
        width: value ? `${(value / max) * 100}%` : null
      }"
    ></span>
  </div>
</template>

<script>
export default {
  name: "VProgress",
  props: {
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      required: false,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.progress {
  width: 100%;
  background-color: var(--progress-background-color);
  position: relative;
  height: 4px;
  border-radius: var(--border-radius);
  overflow: hidden;

  &.determinate {
    .progress-inner {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: auto;
      height: inherit;
      background-color: var(--progress-background-color-accent);
      border-radius: var(--border-radius);
      will-change: left, right;
      border-radius: inherit;
      transition: width var(--fast) var(--transition);
    }
  }

  &.indeterminate {
    display: flex;
    height: 4px;
    width: 100%;
    .progress-inner {
      width: 100%;
      height: 4px;
      background-color: var(--progress-background-color-accent);
      border-radius: var(--border-radius);
      animation: indeterminate 2s infinite; // cubic-bezier(0.4, 0.1, 0.2, 1)
      transition: none;
    }
  }
}

@keyframes indeterminate {
  0% {
    margin-left: 0px;
    margin-right: 100%;
    animation-timing-function: cubic-bezier(0.1, 0.6, 0.9, 0.5);
  }
  50% {
    margin-left: 25%;
    margin-right: 0%;
    animation-timing-function: cubic-bezier(0.4, 0.1, 0.2, 0.9);
  }
  100% {
    margin-left: 100%;
    margin-right: 0;
    animation-timing-function: cubic-bezier(0.1, 0.6, 0.9, 0.5);
  }
}
</style>
