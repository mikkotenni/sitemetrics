<template>
  <div class="f7">
    <span class="pr1">{{ value }}</span>
    <span :class="indicatorClass">{{ groomedPercentage }}%</span>
  </div>
</template>

<script>
/**
 * I wasn't able to install or run Design System and to avoid assignment overhead
 * I came up with my own component and styling to fill the gaps in most crucial features of
 * the application. Hooray for Tachyons!
 */
export default {
  name: "AdditionalFigures",
  props: {
    /**
     * Value needs to be formatted text as it's simply rendered by this component.
     * For example "(99.99%)" or "(4.85)".
     */
    value: {
      type: String,
    },
    /**
     * Percentage has to be number presentation of percentage value. As well as being rendered
     * as it is, number of things are deduced based on its value. For example
     * -16.7592642864 or 5.0046336.
     */
    percentage: {
      type: Number,
    },
  },
  computed: {
    /**
     * Deduce indicator color. Complexity is O(1).
     */
    indicatorClass() {
      return {
        green: this.percentage > 0,
        red: this.percentage < 0,
      };
    },
    // Get formatted percentage to be rendered. Complexity is O(1).
    groomedPercentage() {
      return this.percentage.toFixed(2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>