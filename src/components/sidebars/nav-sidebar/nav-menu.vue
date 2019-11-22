<template>
  <div v-if="links.length > 0" class="nav-menu">
    <h3 v-if="title" class="style-4">{{ title }}</h3>
    <nav>
      <ul>
        <li v-for="{ path, name, target, icon, color } in links" :key="path">
          <template v-if="path.startsWith('http')">
            <a :href="path" :class="color || null" :target="target">
              <v-icon class="icon" :name="icon || 'box'" color="sidebar-text-color" />
              {{ name }}
            </a>
          </template>
          <router-link v-else-if="path" :to="path" :class="color || null">
            <v-icon class="icon" :name="icon || 'box'" color="sidebar-text-color" />
            {{ name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    title: {
      type: String,
      default: null
    },
    links: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 5px;
  margin-top: 15px;
}

.icon {
  margin-right: 12px;
  vertical-align: -7px;
}

a {
  text-decoration: none;
  display: block;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

a:hover,
.nav-menu .router-link-active,
.nav-menu .router-link-exact-active {
  background-color: var(--sidebar-background-color-alt);
  border-radius: var(--border-radius);

  .icon {
    color: currentColor;
    fill: currentColor;
  }
}

ul {
  list-style: none;
  padding: 0;
}

nav > ul > li > * {
  padding: 8px 4px 8px 10px;
  margin: 4px 0;
}

nav {
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.success {
  color: var(--success);
}

.warning {
  color: var(--warning);
}

.danger {
  color: var(--danger);
}

.accent,
.success,
.warning,
.danger {
  .icon {
    color: currentColor;
    fill: currentColor;
  }
}
</style>
