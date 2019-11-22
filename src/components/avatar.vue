<template>
  <div class="v-avatar" :class="{ hover }">
    <div
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: backgroundColor ? `var(--${backgroundColor})` : null
      }"
      class="wrapper"
    >
      <img
        v-if="src != null && !error"
        v-show="!error && loading === false"
        :src="src"
        :alt="alt"
        @load="loading = false"
        @error="onImageLoadingError"
      />
      <v-icon v-else :style="{ fontSize: size / 2 + 2 + 'px' }" name="person" />
    </div>
    <div v-if="indicator" :style="{ backgroundColor: `var(--${color})` }" class="indicator" />
  </div>
</template>

<script>
export default {
  name: "VAvatar",
  props: {
    src: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      required: true
    },
    indicator: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "success"
    },
    hover: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "card-background-color"
    },
    size: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      loading: false,
      error: false
    };
  },
  watch: {
    src() {
      this.error = false;
    }
  },
  methods: {
    onImageLoadingError(error) {
      this.error = error;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-avatar {
  position: relative;
  &.hover:hover {
    i {
      color: var(--white);
    }
  }
}

.wrapper {
  background-color: var(--card-background-color);
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

i {
  transition: all var(--fast) var(--transition);
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: var(--input-icon-color);
  text-align: center;
}

.indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  border-radius: 50%;
  width: 8px;
  height: 8px;
}
</style>
