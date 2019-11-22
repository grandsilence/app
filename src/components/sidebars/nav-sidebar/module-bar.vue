<template>
  <div class="module-bar">
    <v-logo class="logo" />
    <template v-for="singleModule in modules">
      <a
        v-if="singleModule.url.startsWith('http')"
        :key="singleModule.url"
        v-tooltip.left="{
          content: singleModule.name,
          boundariesElement: 'body'
        }"
        class="link"
        :class="singleModule.class"
        :href="singleModule.url"
        target="__blank"
      >
        <v-icon
          class="icon"
          :name="singleModule.icon"
          :color="singleModule.color || 'blue-grey-400'"
        />
      </a>
      <router-link
        v-else
        :key="singleModule.url"
        v-tooltip.left="{
          content: singleModule.name,
          boundariesElement: 'body'
        }"
        class="link"
        :class="singleModule.class"
        :to="singleModule.url"
      >
        <v-icon
          class="icon"
          :name="singleModule.icon"
          :color="singleModule.color || 'blue-grey-400'"
        />
      </router-link>
    </template>
    <div class="spacer" />

    <router-link
      v-tooltip.left="{
        content: currentUser.first_name + ' ' + currentUser.last_name,
        boundariesElement: 'body'
      }"
      class="edit-user"
      :to="`/${currentProjectKey}/users/${currentUser.id}`"
    >
      <v-avatar
        v-if="avatarURL"
        :src="avatarURL"
        :alt="fullName"
        :size="64"
        class="avatar"
        background-color="module-background-color-active"
        hover
      />
      <div class="no-avatar">
        <v-icon name="person" color="blue-grey-400" />
      </div>
    </router-link>

    <button
      v-tooltip.left="{
        content: $t('sign_out'),
        boundariesElement: 'body'
      }"
      class="sign-out"
      type="button"
      @click="confirmSignOut = true"
    >
      <v-icon name="logout" color="blue-grey-400" />
    </button>

    <portal v-if="confirmSignOut" to="modal">
      <v-confirm
        :busy="confirmSignOutLoading"
        :message="editing ? $t('sign_out_confirm_edits') : $t('sign_out_confirm')"
        :confirm-text="$t('sign_out')"
        @cancel="confirmSignOut = false"
        @confirm="signOut"
      />
    </portal>
  </div>
</template>

<script>
import VLogo from "./logo";
import { mapState, mapGetters } from "vuex";
import { UPDATE_PROJECT, RESET } from "@/store/mutation-types";

export default {
  name: "ModuleBar",
  components: {
    VLogo
  },
  data() {
    return {
      confirmSignOut: false,
      confirmSignOutLoading: false
    };
  },
  computed: {
    ...mapState(["permissions", "currentUser", "currentProjectKey"]),
    ...mapGetters(["editing"]),
    modules() {
      const modules = [];

      modules.push({
        url: `/${this.currentProjectKey}/collections`,
        name: this.$t("collections"),
        icon: "box"
      });

      if (
        this.permissions.directus_users.read !== "none" ||
        this.permissions.directus_users.read !== "mine"
      ) {
        modules.push({
          url: `/${this.currentProjectKey}/users`,
          name: this.$t("user_directory"),
          icon: "people"
        });
      }

      if (this.permissions.directus_files.read !== "none") {
        modules.push({
          url: `/${this.currentProjectKey}/files`,
          name: this.$t("file_library"),
          icon: "collections"
        });
      }

      modules.push({
        url: "https://docs.directus.io",
        name: this.$t("help_and_docs"),
        icon: "help"
      });

      if (this.$store.state.currentUser.admin === true) {
        modules.push({
          url: `/${this.currentProjectKey}/settings`,
          name: this.$t("admin_settings"),
          icon: "settings",
          class: "settings"
        });
      }

      return modules;
    },
    avatarURL() {
      return this.currentUser.avatar?.data?.full_url;
    },
    fullName() {
      const { first_name, last_name } = this.currentUser;
      return `${first_name} ${last_name}`;
    }
  },
  methods: {
    async signOut() {
      this.confirmSignOutLoading = true;
      await this.$api.logout();
      this.$store.commit(UPDATE_PROJECT, {
        key: this.$store.state.currentProjectKey,
        data: {
          authenticated: false
        }
      });

      this.$store.commit(RESET);
      await this.$store.dispatch("getProjects");
      this.$router.push("/login");
      this.confirmSignOutLoading = false;
    }
  }
};
</script>

<style lang="scss">
.module-bar .router-link-active .icon.custom svg {
  fill: var(--module-text-color-active) !important;
}
.module-bar .link:hover .icon.custom svg {
  fill: var(--module-text-color-active) !important;
}
</style>

<style lang="scss" scoped>
.module-bar {
  width: 64px;
  flex-basis: 64px;
  flex-shrink: 0;
  height: 100%;
  background-color: var(--module-background-color);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}

.link {
  width: 64px;
  height: 64px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin: 0;
  padding: 0;

  &:hover .icon {
    color: var(--module-text-color-active) !important;
    fill: var(--module-text-color-active) !important;
  }

  &.settings {
    &:hover .icon {
      color: var(--warning) !important;
      fill: var(--warning) !important;
    }
  }

  &.router-link-active {
    background-color: var(--module-background-color-active);

    .icon {
      color: var(--module-text-color-active) !important;
      fill: var(--module-text-color-active) !important;
    }
  }
}

.spacer {
  flex-grow: 1;
}

.no-avatar {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--module-background-color-active);
}

.edit-user {
  width: 64px;
  height: 64px;
  position: relative;
  text-decoration: none;
  z-index: 2;

  // Overlay
  &::after {
    transition: all var(--fast) var(--transition);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: var(--module-background-color);
    opacity: 0.5;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    &::after {
      opacity: 0;
    }
    i {
      color: var(--white) !important;
    }
  }
}

.sign-out {
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 64px;
  left: 0;
  width: 64px;
  height: 64px;
  transform: translateY(64px);
  transition: transform var(--fast) var(--transition);
  background-color: var(--module-background-color-active);
  &:hover {
    i {
      color: var(--white) !important;
    }
  }
}

.edit-user:hover + .sign-out,
.sign-out:hover {
  transform: translateY(0px);
}
</style>
