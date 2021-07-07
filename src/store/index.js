import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visits: {
      // Using objects instead of arrays to gain constant O(1) lookups.
      2021: {
        2: {
          1: 15838,
          2: 27324,
          3: 31869,
          4: 18231,
          5: 22716,
          6: 26999,
          7: 21319,
          8: 40878,
          9: 20639,
          10: 21147,
          11: 18546,
          12: 41963,
          13: 25054,
          14: 36678,
          15: 26464,
          16: 28987,
          17: 38273,
          18: 33666,
          19: 38910,
          20: 17779,
          21: 32608,
          22: 25998,
          23: 15038,
          24: 15199,
          25: 36178,
          26: 22157,
          27: 41824,
          28: 27853
        },
        3: {
          1: 21992,
          2: 5896,
          3: 43861,
          4: 40898,
          5: 34786,
          6: 29125,
          7: 17256,
          8: 12745,
          9: 24286,
          10: 9926,
          11: 18135,
          12: 28400,
          13: 37238,
          14: 31711,
          15: 31752,
          16: 14883,
          17: 37323,
          18: 36456,
          19: 3709,
          20: 3736,
          21: 19580,
          22: 8370,
          23: 25254,
          24: 3051,
          25: 20020,
          26: 44378,
          27: 29368,
          28: 31218,
          29: 7491,
          30: 7518,
          31: 18506
        },
      },
    },
    siteMetrics: {
      2021: {
        2: {
          totalSales: {
            visits: 770135,
            sales: 3737596.12,
            orders: 16091,
            soldItems: 27241,
            soldItemsThroughNosto: 2245
          },
          potentialSales: {
            carts: 53361,
            cartTotalValue: 11524208.65,
            cartsAbandoned: 37270
          },
          sessionLifecycle: {
            totalPageViews: 2521357,
            totalProductViews: 1518657,
            averageSessionDuration: 259
          },
        },
        3: {
          totalSales: {
            visits: 698868,
            sales: 2962139,
            orders: 12145,
            soldItems: 20807,
            soldItemsThroughNosto: 2056
          },
          potentialSales: {
            carts: 50063,
            cartTotalValue: 12529651.35,
            cartsAbandoned: 37918
          },
          sessionLifecycle: {
            totalPageViews: 2317225,
            totalProductViews: 1489480,
            averageSessionDuration: 246
          },
        },
      },
      2000: {
        2: {
          totalSales: {
            visits: 45544,
            sales: 8655.12,
            orders: 105491,
            soldItems: 7444,
            soldItemsThroughNosto: 64336
          },
          potentialSales: {
            carts: 45333,
            cartTotalValue: 756896.65,
            cartsAbandoned: 1232
          },
          sessionLifecycle: {
            totalPageViews: 5237,
            totalProductViews: 4456335,
            averageSessionDuration: 4335
          },
        },
        3: {
          totalSales: {
            visits: 588543,
            sales: 6245139,
            orders: 937465,
            soldItems: 348563,
            soldItemsThroughNosto: 26474
          },
          potentialSales: {
            carts: 36474,
            cartTotalValue: 364736348.35,
            cartsAbandoned: 443255
          },
          sessionLifecycle: {
            totalPageViews: 666666,
            totalProductViews: 4435644,
            averageSessionDuration: 554
          },
        }
      },
    },
    accountActivityData: [
      {
        type: "new_rule",
        title: "new_category_merchandising_rule",
        time: 1614787862
      },
      {
        type: "new_rule",
        title: "new_category_merchandising_rule",
        time: 1614906662
      },
      {
        type: "update_campaign",
        title: "updated_recommendations_campaign_title",
        time: 1615909514
      },
      {
        type: "update_campaign",
        title: "updated_recommendations_campaign_title",
        time: 1616545874
      },
      {
        type: "new_campaign",
        title: "new_onsite_content_campaign",
        time: 1616549474
      },
      {
        type: "delete_rule",
        title: "remove_category_merchandising_rule",
        time: 1615749474
      },
      {
        type: "reindex",
        title: "reindex_products",
        time: 1616151454
      },
      {
        type: "update_products",
        title: "new_category_merchandising_rule",
        time: 1616455433
      },
      {
        type: "new_campaign",
        title: "new_category_merchandising_campaign",
        time: 1616858011
      },
      {
        type: "new_campaign",
        title: "new_category_merchandising_campaign",
        time: 1617158011
      }
    ],
    views: {
      siteMetrics: {
        year: 2021,
        month: 3,
        comparisonYear: 2021,
        comparisonMonth: 2,
      }
    }
  },
  mutations: {
    /**
     * Modify base data of given view by property key.
     * @param {object} state -
     * @param {object} payload has {string} view, {string} property, {integer|string} value.
     */
    setViewPropertyValue(state, payload) {
      state.views[payload.view][payload.property] = payload.value;
    },
  },
  actions: {
    /**
     * Initiate change in any given view property. I'm doing it via action in case there
     * ever would be any routines or asynchronous operations involved.
     * @param {*} context -
     * @param {*} payload has {string} view, {string} property, {integer|string} value.
     */
    initiateChangeInViewDataValue(context, payload) {
      context.commit('setViewPropertyValue', payload);
    }
  },
  modules: {
    // FIXME: Consider using modules to battle this store getting bloated.
  },
  getters: {
    /**
     * Calculate conversion range figure.
     * Complexity is O(1).
     * @param {object} state of this store.
     * @param {integer} specifiedYear optional year if not default.
     * @param {integer} specifiedMonth optional month if not default.
     * @returns string with decimals.
     */
    conversionRange: (state) => (specifiedYear, specifiedMonth) => {
      const year = specifiedYear || state.views.siteMetrics.year;
      const month = specifiedMonth || state.views.siteMetrics.month;
      const orders = state.siteMetrics[year][month].totalSales.orders;
      const visits = state.siteMetrics[year][month].totalSales.visits;
      return utils.formatDecimalPlaces((orders / visits) * 100);
    },
    /**
     * Calculate average value per visit.
     * Again, complexity is O(1).
     * @param {object} state of this store.
     * @param {integer} specifiedYear optional year if not default.
     * @param {integer} specifiedMonth optional month if not default.
     * @returns string with decimals.
     */
    averageVisitValue: (state) => (specifiedYear, specifiedMonth) => {
      const year = specifiedYear || state.views.siteMetrics.year;
      const month = specifiedMonth || state.views.siteMetrics.month;
      const sales = state.siteMetrics[year][month].totalSales.sales;
      const visits = state.siteMetrics[year][month].totalSales.visits;
      return utils.formatDecimalPlaces(sales / visits);
    },
    /**
     * Order value average.
     * Complexity is O(1).
     * @param {object} state of this store.
     * @param {integer} specifiedYear optional year if not default.
     * @param {integer} specifiedMonth optional month if not default.
     * @returns string with decimals.
     */
    averageOrderValue: (state) => (specifiedYear, specifiedMonth) => {
      const year = specifiedYear || state.views.siteMetrics.year;
      const month = specifiedMonth || state.views.siteMetrics.month;
      const sales = state.siteMetrics[year][month].totalSales.sales;
      const orders = state.siteMetrics[year][month].totalSales.orders;
      return utils.formatDecimalPlaces(sales / orders);
    },
    /**
     * Impact of Nosto recommendation.
     * Complexity is O(1) thanks to making lookups with keys instead of array
     * iterations.
     * @param {object} state of this store.
     * @param {integer} specifiedYear optional year if not default.
     * @param {integer} specifiedMonth optional month if not default.
     * @returns string with decimals.
     */
    shareOfItemsSoldThroughNosto: (state) => (specifiedYear, specifiedMonth) => {
      const year = specifiedYear || state.views.siteMetrics.year;
      const month = specifiedMonth || state.views.siteMetrics.month;
      const soldItemsThroughNosto = state.siteMetrics[year][month].totalSales.soldItemsThroughNosto;
      const soldItems = state.siteMetrics[year][month].totalSales.soldItems;
      return utils.formatDecimalPlaces((soldItemsThroughNosto / soldItems) * 100);
    },
    /**
     * Percentage of abandoned carts.
     * Complexity is O(1).
     * @param {object} state of this store.
     * @param {integer} specifiedYear optional year if not default.
     * @param {integer} specifiedMonth optional month if not default.
     * @returns string with decimals.
     */
    abandonedCartRate: (state) => (specifiedYear, specifiedMonth) => {
      const year = specifiedYear || state.views.siteMetrics.year;
      const month = specifiedMonth || state.views.siteMetrics.month;
      const cartsAbandoned = state.siteMetrics[year][month].potentialSales.cartsAbandoned;
      const carts = state.siteMetrics[year][month].potentialSales.carts;
      return utils.formatDecimalPlaces((cartsAbandoned / carts) * 100);
    },
    /**
     * Average value of abandoned cart.
     * Complexity is O(1).
     * @param {object} state of this store.
     * @param {integer} specifiedYear optional year if not default.
     * @param {integer} specifiedMonth optional month if not default.
     * @returns string with decimals.
     */
    averageAbandonedCartValue: (state) => (specifiedYear, specifiedMonth) => {
      const year = specifiedYear || state.views.siteMetrics.year;
      const month = specifiedMonth || state.views.siteMetrics.month;
      const cartTotalValue = state.siteMetrics[year][month].potentialSales.cartTotalValue;
      const sales = state.siteMetrics[year][month].totalSales.sales;
      const cartsAbandoned = state.siteMetrics[year][month].potentialSales.cartsAbandoned;
      return utils.formatDecimalPlaces((cartTotalValue - sales) / cartsAbandoned);
    }
  }
});

/**
 * Utilities.
 */
const utils = {
  formatDecimalPlaces: value => value.toFixed(2)
}
