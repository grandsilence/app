export default {
  computed: {
    orderUrl() {
      const baseUrl = window.__DirectusConfig__.frontendUrl;
      return `${baseUrl}/?id=${this.values.id}&secret=${this.value}`;
    }
  }
};
