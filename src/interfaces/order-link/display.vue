<template>
  <div class="no-wrap">
    <a :href="orderUrl" target="_blank" rel="noopener noreferrer">СОДЕРЖИМОЕ ЗАКАЗА</a>
  </div>
</template>

<script>
import mixin from "@directus/extension-toolkit/mixins/interface";
import orderUrlMixin from "./orderUrlMixin";

export default {
  mixins: [mixin, orderUrlMixin]
};
</script>
