<template functional>
  <span class="public-notice" :style="{ color: `var(--${props.color})` }">
    <v-spinner
      v-if="props.loading"
      :size="20"
      :line-size="2"
      line-fg-color="var(--blue-grey)"
      line-bg-color="var(--blue-grey-100)"
    />
    <v-icon v-if="!props.loading && props.icon" :name="props.icon" :color="props.color" />
    <span class="copy"><slot /></span>
  </span>
</template>

<script>
export default {
  name: "PublicNotice",
  props: {
    color: {
      type: String,
      default: "blue-grey"
    },
    icon: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.public-notice {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.copy {
  margin-left: 8px;
}
</style>
