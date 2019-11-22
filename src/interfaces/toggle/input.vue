<template>
  <div v-if="checkbox" class="checkbox">
    <input
      :id="name"
      type="checkbox"
      :disabled="readonly"
      @change="updateValue($event.target.checked)"
    />
    <label :for="name">
      <v-icon :name="icon" class="icon" />
      {{ label }}
    </label>
  </div>

  <div v-else class="toggle" :class="{ on: valBool }">
    <v-toggle :value="valBool" :disabled="readonly" @input="updateValue" />
    <span>{{ label }}</span>
  </div>
</template>

<script>
import mixin from "@directus/extension-toolkit/mixins/interface";

export default {
  mixins: [mixin],
  computed: {
    icon() {
      return this.valBool ? "check_box" : "check_box_outline_blank";
    },
    checkbox() {
      return this.options.checkbox || false;
    },
    label() {
      return this.valBool ? this.options.labelOn : this.options.labelOff;
    },
    // Sometimes, the API might return `0`, or `"0"` as the value. These should both be considered
    // false as well
    valBool() {
      if (this.value === true || this.value === 1 || this.value === "1") return true;
      return false;
    }
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
}
.checkbox {
  position: relative;
  display: inline-block;
  .material-icons {
    margin-top: -2px;
  }
  label {
    transition: all var(--fast) var(--transition);
    color: var(--input-text-color);
    padding: 0.5rem 0 0.5rem 0;
  }
  // &:hover label {
  //   color: var(--blue-grey-800);
  // }
  // input:checked + label {
  //   color: var(--input-text-color);
  // }
  // input:disabled + label {
  //   color: var(--blue-grey-300);
  // }
  input:disabled {
    cursor: not-allowed;
  }
}

.toggle {
  display: flex;
  align-items: center;
  height: var(--input-height);

  span {
    margin-left: 8px;
    font-size: var(--input-font-size);
  }

  &.on span {
    // color: var(--blue-grey-800);
  }
}
</style>
