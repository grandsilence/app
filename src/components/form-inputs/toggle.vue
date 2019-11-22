<template>
  <div class="v-toggle" :class="{ disabled }" @click.prevent="emitValue">
    <input :id="id" v-model="value" type="checkbox" :disabled="disabled" />
    <div class="switch-track" :class="{ active: value }" />
    <div class="switch-thumb" :class="{ active: value }" />
  </div>
</template>

<script>
export default {
  name: "VToggle",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    }
  },
  methods: {
    emitValue() {
      if (this.disabled) return;
      this.$emit("input", !this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-toggle {
  padding: 3px;
  position: relative;
  cursor: pointer;
  width: max-content;

  .user-is-tabbing &:focus-within .switch-track::after {
    box-shadow: 0 0 5px var(--action-dark);
  }
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input {
  position: absolute;
  opacity: 0;
  left: -99999px;
}

.switch-track {
  &::after {
    content: "";
    display: block;
    height: 20px;
    width: 40px;
    background-color: transparent;
    border-radius: 12px;
    cursor: pointer;
    border: var(--input-border-width) solid var(--input-border-color);
    transition: all var(--fast) var(--transition);
  }

  &:hover::after {
    border-color: var(--input-border-color-hover);
  }

  &.active::after {
    border: 2px solid var(--input-background-color-active);
    background-color: var(--input-background-color-active);
  }
}

.switch-thumb {
  position: absolute;
  top: 7px;
  left: 7px;
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: var(--input-border-color);
  transition: transform var(--fast) var(--transition);

  &.active {
    background-color: var(--input-text-color-active);
    transform: translateX(20px);
  }
}

input:disabled ~ .switch {
  background-color: var(--input-background-color-disabled);

  &::after {
    background-color: var(--input-background-color-disabled);
  }
}
</style>
