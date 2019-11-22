<template>
  <v-spinner
    class="v-ext-input-loading"
    size="20"
    line-fg-color="var(--blue-grey-200)"
    line-bg-color="var(--blue-grey-50)"
  />
</template>

<script>
export default {
  name: "VExtInputLoading"
};
</script>

<style lang="scss" scoped>
.v-ext-input-loading {
  width: max-content;
}
</style>
