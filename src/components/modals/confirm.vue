<template>
  <v-modal-base :title="title" :message="message" @cancel="$emit('cancel')">
    <div class="buttons" @keydown.esc="$emit('cancel')">
      <button class="cancel" @click="$emit('cancel')">
        {{ cancelText || $t("cancel") }}
      </button>
      <v-button :bg="color" class="confirm" @click="$emit('confirm')">
        <template v-if="loading">
          <v-spinner :size="20" :line-size="2" />
        </template>
        <template v-else>
          {{ confirmText || $t("ok") }}
        </template>
      </v-button>
    </div>
  </v-modal-base>
</template>

<script>
import VModalBase from "./modal-base.vue";

export default {
  name: "VConfirm",
  components: {
    VModalBase
  },
  props: {
    title: {
      type: String,
      required: false
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: null
    },
    cancelText: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "action"
    }
  }
};
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
}

.cancel {
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--fast) var(--transition);
  transition-property: border-color, background-color, color;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px 1px;
  height: var(--button-height);
  min-width: 160px;
  border: var(--input-border-width) solid var(--button-tertiary-background-color);
  // background-color: var(--button-secondary-background-color);
  color: var(--button-tertiary-text-color);
  margin-right: 20px;
  font-weight: var(--weight-bold);
  font-size: var(--button-font-size);
  transition: color var(--fast) var(--transition);

  &:hover {
    color: var(--button-tertiary-text-color-hover);
  }
}
</style>
