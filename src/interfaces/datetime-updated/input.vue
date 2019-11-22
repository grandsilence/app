<template>
  <div v-if="value" class="datetime-updated">
    <v-timeago
      v-if="options.showRelative"
      v-tooltip="displayValue"
      :datetime="date"
      :auto-update="60"
      :locale="$i18n.locale"
      class="no-wrap"
    ></v-timeago>
    <div v-else>{{ displayValue }}</div>
    <v-icon name="today" />
  </div>
  <v-input
    v-else-if="newItem"
    :readonly="true"
    :placeholder="$t('interfaces-datetime-updated-now')"
    icon-right="today"
  />
  <v-input
    v-else
    :readonly="true"
    :placeholder="$t('interfaces-datetime-updated-unknown')"
    icon-right="today"
  />
</template>

<script>
import mixin from "@directus/extension-toolkit/mixins/interface";

export default {
  mixins: [mixin],
  computed: {
    date() {
      if (!this.value) return null;
      return new Date(this.value.replace(" ", "T") + "Z");
    },
    displayValue() {
      if (!this.date) return;
      return this.$d(this.date, "long") + " GMT";
    }
  }
};
</script>

<style lang="scss" scoped>
.datetime-updated {
  position: relative;
  border: var(--input-border-width) solid var(--input-border-color);
  border-radius: var(--border-radius);
  height: var(--input-height);
  font-size: var(--input-font-size);
  padding: 4px 10px;
  display: flex;
  align-items: center;
  background-color: var(--input-background-color-disabled);
  i {
    position: absolute;
    top: 50%;
    color: var(--input-icon-color);
    transform: translateY(-50%);
    font-size: 24px;
    right: 10px;
  }
}
</style>
