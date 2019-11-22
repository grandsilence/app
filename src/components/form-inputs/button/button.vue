<template>
  <button
    :class="[bg || 'no-bg', { fullwidth, loading, small }, color, outline]"
    :type="type"
    :disabled="disabled || loading"
    @click.prevent.stop="$emit('click')"
  >
    <v-icon v-if="icon && !loading" :name="icon" class="icon" />
    <v-spinner
      v-if="loading"
      :line-size="2"
      size="13"
      line-fg-color="var(--blue-grey-300)"
      line-bg-color="#fff"
      class="spinner"
    />
    <slot />
  </button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    fullwidth: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white",
      validator: value => ["white", "black"].includes(value)
    },
    bg: {
      type: String,
      default: "action",
      validator: value => ["action", "gray", "warning", "danger"].includes(value)
    },
    outline: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
button.action {
  background-color: var(--button-primary-background-color);
  border-color: var(--button-primary-background-color);

  &:hover:not(:disabled) {
    background-color: var(--button-primary-background-color-hover);
    border-color: var(--button-primary-background-color-hover);
  }
}

button.gray {
  background-color: var(--button-tertiary-background-color);
  border-color: var(--button-tertiary-background-color);

  &:hover:not(:disabled) {
    background-color: var(--blue-grey-200);
    border-color: var(--blue-grey-200);
  }
}

button.warning {
  background-color: var(--warning);
  border-color: var(--warning);

  &:hover:not(:disabled) {
    background-color: var(--warning-dark);
    border-color: var(--warning-dark);
  }
}

button.danger {
  background-color: var(--danger);
  border-color: var(--danger);

  &:hover:not(:disabled) {
    background-color: var(--danger-dark);
    border-color: var(--danger-dark);
  }
}

button.black {
  color: var(--blue-grey-800);
}

button.white {
  color: var(--white);
}

button {
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--fast) var(--transition);
  transition-property: border-color, background-color, color;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: var(--button-font-size);
  font-weight: var(--weight-bold);
  padding: 0 20px 1px;
  height: var(--button-height);
  min-width: 136px;
  border: var(--input-border-width) solid var(--action);

  &.small {
    font-size: inherit;
  }

  &:disabled:not(.loading) {
    background-color: var(--button-primary-background-color-disabled);
    border: var(--input-border-width) solid var(--button-primary-background-color-disabled);
    color: var(--button-primary-text-color-disabled);
    cursor: not-allowed;
  }

  &.loading {
    cursor: progress;
  }

  &.fullwidth {
    width: 100%;
  }

  .icon {
    vertical-align: -6px;
    margin-right: 6px;
  }
}

.spinner {
  margin-right: 10px;
}
</style>
