<template>
  <div>
    <grid columns="1fr 1fr 1fr">
      <panel v-for="item in items" :key="item._id">
        <stack direction="vertical">
          <kpi :title="item.title" :value="item.value"></kpi>
          <additional-figures
            v-if="item.additionalValue && item.additionalPercentage"
            :value="item.additionalValue"
            :percentage="item.additionalPercentage"
          ></additional-figures>
        </stack>
      </panel>
    </grid>
  </div>
</template>

<script>
import AdditionalFigures from "./AdditionalFigures.vue";

/**
 * The middle man between SiteMetricsView and Kpi/AdditionalFigures combinations.
 * I suppose having this is not absolutely mandatory but it does break down templating
 * responsibility of SiteMetricsView.
 */
export default {
  name: "KpiSet",
  components: {
    AdditionalFigures,
  },
  props: {
    /**
     * Array of objects. For example { _id: 1, title: "Conversion rate", value: "19.04%",
     * additionalValue: "(14.55%)", additionalPercentage: -8.938495563 }.
     */
    items: {
      type: Array,
      validator: (arr) =>
        arr.every(
          (item) =>
            item.hasOwnProperty("_id") &&
            item.hasOwnProperty("title") &&
            item.hasOwnProperty("value")
        ),
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>