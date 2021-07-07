<template>
  <div id="app">
    <!-- FIXME: Use route view or such to improve the application. -->
    <site-metrics-view></site-metrics-view>
  </div>
</template>

<script>
import SiteMetricsView from "./components/SiteMetricsView.vue";

export default {
  name: "App",
  components: {
    SiteMetricsView,
  },
};
</script>

<style></style>
