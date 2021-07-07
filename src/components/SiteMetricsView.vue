<template>
  <div>
    <layout>
      <text-style type="h1">Site Metrics</text-style>
      <text-style type="p">
        Because of somewhat selective amount of mock data available, toggling
        between current month data and comparison month data is a bit awkward.
        Not to mention toggling the year. But still, toggling between months and
        years gives good enough impression on how reactivity works.
      </text-style>
      <action-button @click="toggleYear" size="small">Toggle year</action-button>
      <action-button @click="toggleMonth" size="small">Toggle month</action-button>

      <panel :heading="`Total Sales ${panelHeading}`">
        <kpi-set :items="itemsOfTotalSales"></kpi-set>
      </panel>

      <panel heading="Graph view">
        <line-chart
          :heading="headingOfLineChart"
          :series="seriesOfLineChart"
          :categories="categoriesOfLineChart"
        ></line-chart>
      </panel>

      <panel :heading="`Potential Sales ${panelHeading}`">
        <kpi-set :items="itemsOfPotentialSales"></kpi-set>
      </panel>
    </layout>
  </div>
</template>

<script>
import KpiSet from "./KpiSet.vue";

/**
 * View or page component that could be used as router view. This one is aware
 * of which KPI sets there is and what KPIs they hold inside. I'm asking data from
 * store and compiling convenient data packages for KPI sets.
 */
export default {
  name: "SiteMetricsView",
  components: {
    KpiSet,
  },
  methods: {
    // Two "extra" methods simply to see how Site Metrics page reacts when data changes.
    toggleYear() {
      this.$store.dispatch("initiateChangeInViewDataValue", {
        view: "siteMetrics",
        property: "year",
        value: this.$store.state.views.siteMetrics.year === 2021 ? 2000 : 2021,
      });
    },
    toggleMonth() {
      this.$store.dispatch("initiateChangeInViewDataValue", {
        view: "siteMetrics",
        property: "month",
        value: this.$store.state.views.siteMetrics.month === 3 ? 2 : 3,
      });
    },
    // Calculate how many percentages a differs from b. Complexity is O(1).
    calculateChangePercentage(a, b) {
      return ((a - b) / b) * 100;
    },
  },
  computed: {
    panelHeading() {
      return `${this.$store.state.views.siteMetrics.month}/${this.$store.state.views.siteMetrics.year}`;
    },
    headingOfLineChart() {
      return `${this.$store.state.views.siteMetrics.month}/2021`;
    },
    categoriesOfLineChart() {
      return Object.keys(
        this.$store.state.visits["2021"][
          this.$store.state.views.siteMetrics.month
        ]
      );
    },
    seriesOfLineChart() {
      return [
        {
          name: "Visits",
          data: Object.values(
            this.$store.state.visits["2021"][
              this.$store.state.views.siteMetrics.month
            ]
          ),
        },
      ];
    },
    // Create items array for Total Sales KPI section. Complexity is O(1).
    itemsOfTotalSales() {
      /**
       * I'm calling store getters with and without arguments to gain comparison and monthly
       * figures.
       */
      const comparisonYear = this.$store.state.views.siteMetrics.comparisonYear;
      const comparisonMonth =
        this.$store.state.views.siteMetrics.comparisonMonth;
      return [
        {
          _id: 1,
          title: "Conversion rate",
          value: `${this.$store.getters.conversionRange()}%`,
          additionalValue: `(${this.$store.getters.conversionRange(
            comparisonYear,
            comparisonMonth
          )}%)`,
          additionalPercentage: this.calculateChangePercentage(
            this.$store.getters.conversionRange(),
            this.$store.getters.conversionRange(comparisonYear, comparisonMonth)
          ),
        },
        {
          _id: 2,
          title: "Average visit value",
          value: `$ ${this.$store.getters.averageVisitValue()}`,
          additionalValue: `(${this.$store.getters.averageVisitValue(
            comparisonYear,
            comparisonMonth
          )})`,
          additionalPercentage: this.calculateChangePercentage(
            this.$store.getters.averageVisitValue(),
            this.$store.getters.averageVisitValue(
              comparisonYear,
              comparisonMonth
            )
          ),
        },
        {
          _id: 3,
          title: "Average order value",
          value: `$ ${this.$store.getters.averageOrderValue()}`,
          additionalValue: `(${this.$store.getters.averageOrderValue(
            comparisonYear,
            comparisonMonth
          )})`,
          additionalPercentage: this.calculateChangePercentage(
            this.$store.getters.averageOrderValue(),
            this.$store.getters.averageOrderValue(
              comparisonYear,
              comparisonMonth
            )
          ),
        },
        {
          _id: 4,
          title: "Share of items sold through Nosto recommendations",
          value: `${this.$store.getters.shareOfItemsSoldThroughNosto()}%`,
          additionalValue: `(${this.$store.getters.shareOfItemsSoldThroughNosto(
            comparisonYear,
            comparisonMonth
          )}%)`,
          additionalPercentage: this.calculateChangePercentage(
            this.$store.getters.shareOfItemsSoldThroughNosto(),
            this.$store.getters.shareOfItemsSoldThroughNosto(
              comparisonYear,
              comparisonMonth
            )
          ),
        },
      ];
    },
    // Create items array for Potential Sales KPI section. Complexity is O(1).
    itemsOfPotentialSales() {
      const comparisonYear = this.$store.state.views.siteMetrics.comparisonYear;
      const comparisonMonth =
        this.$store.state.views.siteMetrics.comparisonMonth;
      return [
        {
          _id: 1,
          title: "Abandoned cart rate",
          value: `${this.$store.getters.abandonedCartRate()}%`,
          additionalValue: `(${this.$store.getters.abandonedCartRate(
            comparisonYear,
            comparisonMonth
          )}%)`,
          additionalPercentage: this.calculateChangePercentage(
            this.$store.getters.abandonedCartRate(),
            this.$store.getters.abandonedCartRate(
              comparisonYear,
              comparisonMonth
            )
          ),
        },
        {
          _id: 2,
          title: "Average abandoned cart value",
          value: `$ ${this.$store.getters.averageAbandonedCartValue()}`,
          additionalValue: `(${this.$store.getters.averageAbandonedCartValue(
            comparisonYear,
            comparisonMonth
          )})`,
          additionalPercentage: this.calculateChangePercentage(
            this.$store.getters.averageAbandonedCartValue(),
            this.$store.getters.averageAbandonedCartValue(
              comparisonYear,
              comparisonMonth
            )
          ),
        },
      ];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
