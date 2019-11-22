<template>
  <span class="v-time-ago">{{ timeFromNow }}</span>
</template>

<script>
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

// require('javascript-time-ago/load-all-locales')

TimeAgo.addLocale(en);

export default {
  name: "VTimeAgo",
  props: {
    datetime: {
      type: Date,
      default: null
    },
    format: {
      type: String,
      default: null
    },
    live: {
      type: Boolean,
      default: true
    },
    locale: {
      type: String,
      default: "en-US"
    }
  },
  data() {
    return {
      timeFromNow: null
    };
  },
  created() {
    this.timeAgo = new TimeAgo(this.locale); // 'en-US'
    this.getTimeFromNow();
  },
  beforeDestroy() {
    clearTimeout(this.liveInterval);
  },
  methods: {
    getTimeFromNow() {
      this.timeFromNow = this.timeAgo.format(new Date(this.datetime), false); // false, twitter, time

      if (this.live) {
        this.liveInterval = setTimeout(this.getTimeFromNow, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-time-ago {
  //
}
</style>
