<template>
  <div class="public">
    <div class="container" :class="{ wide }">
      <a href="https://directus.io" target="_blank" class="logo">
        <img
          v-tooltip.right="{ classes: ['inverted'], content: version }"
          alt="Directus Logo"
          src="../assets/logo-dark.svg"
        />
      </a>
      <div class="content">
        <h1 class="title type-heading-large">{{ heading }}</h1>
        <slot />
      </div>
      <div class="public-view-notice"><slot name="notice" /></div>
    </div>
    <div class="art" :style="artStyles">
      <img
        v-if="project_foreground.full_url"
        class="logo"
        :src="project_foreground.full_url"
        :alt="project_name"
      />
    </div>
  </div>
</template>

<script>
import { version } from "../../package.json";
import { mapGetters } from "vuex";

const defaults = {
  project_color: "project-background-color",
  project_background: { full_url: null },
  project_foreground: { full_url: null },
  project_name: "Directus"
};

export default {
  name: "PublicView",
  props: {
    heading: {
      type: String,
      required: true
    },
    wide: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["currentProject"]),
    artStyles() {
      if (this.project_background?.full_url) {
        return { backgroundImage: `url(${this.project_background?.full_url})` };
      }

      return { backgroundColor: `var(--${this.project_color})` };
    },
    project_color() {
      return this.currentProject?.data?.project_color || defaults.project_color;
    },
    project_background() {
      return this.currentProject?.data?.project_background || defaults.project_background;
    },
    project_foreground() {
      return this.currentProject?.data?.project_foreground || defaults.project_foreground;
    },
    project_name() {
      return this.currentProject?.data?.project_name || defaults.project_name;
    },
    version() {
      return `Directus v${version}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.public {
  display: flex;
  height: 100%;
}

.container {
  background-color: var(--page-background-color);
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  width: 100%;
  height: 100%;
  min-height: 700px;
  overflow-y: auto;
  position: relative;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  &.wide {
    max-width: 872px;
  }

  .logo {
    position: absolute;
    top: 40px;
    left: 80px;
    height: 40px;
    user-select: none;
    cursor: help;
  }

  .content {
    width: 100%;
  }

  .public-view-notice {
    position: absolute;
    bottom: 40px;
    left: 80px;
    user-select: none;
    pointer-events: none;
  }
}

.art {
  transition: background-color var(--fast) var(--transition);
  flex-grow: 1;
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    width: 100%;
    max-width: 200px;
    height: auto;
  }
}
</style>
