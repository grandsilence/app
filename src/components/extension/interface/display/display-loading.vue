<template>
  <v-spinner
    class="v-ext-display-loading"
    size="20"
    line-fg-color="var(--blue-grey-200)"
    line-bg-color="var(--blue-grey-50)"
  />
</template>

<script>
export default {
  name: "VExtDisplayLoading"
};
</script>

<style lang="scss" scoped>
.v-ext-display-loading {
  width: max-content;
}
</style>
