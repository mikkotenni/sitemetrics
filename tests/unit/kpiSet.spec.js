import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as DesignSystem from '../../public/system.min.js'
import KpiSet from "@/components/KpiSet.vue";
import AdditionaFigures from "@/components/AdditionalFigures.vue"

const localVue = createLocalVue();
localVue.use(Vuex);

Object.keys(DesignSystem.components).forEach(cmp =>
  localVue.component(DesignSystem.components[cmp].name, DesignSystem.components[cmp]));

const store = new Vuex.Store({
  state: {
    siteMetrics: {
      2021: {
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
        }
      }
    },
    views: {
      siteMetrics: {
        year: 2021,
        month: 3,
        comparisonYear: 2000,
        comparisonMonth: 2,
      }
    },
  },
  mutations: {
    setViewDataValue: (state, payload) => {
      state.views[payload.view][payload.property] = payload.value;
    },
  },
  getters: {
    conversionRange: (state) => (specifiedYear, specifiedMonth) => {
      const year = specifiedYear || state.views.siteMetrics.year;
      const month = specifiedMonth || state.views.siteMetrics.month;
      const orders = state.siteMetrics[year][month].totalSales.orders;
      const visits = state.siteMetrics[year][month].totalSales.visits;
      return utils.formatDecimalPlaces((orders / visits) * 100);
    },
    averageVisitValue: (state) => (specifiedYear, specifiedMonth) => {
      const year = specifiedYear || state.views.siteMetrics.year;
      const month = specifiedMonth || state.views.siteMetrics.month;
      const sales = state.siteMetrics[year][month].totalSales.sales;
      const visits = state.siteMetrics[year][month].totalSales.visits;
      return utils.formatDecimalPlaces(sales / visits);
    },
  },
});

const utils = {
  formatDecimalPlaces: (value) => value.toFixed(2),
};

function calculateChangePercentage(a, b) {
  return ((a - b) / b) * 100;
}

const comparisonYear = store.state.views.siteMetrics.comparisonYear;
const comparisonMonth = store.state.views.siteMetrics.comparisonMonth;
const itemsOfTotalSales = [
  {
    _id: 1,
    title: "Conversion rate",
    value: `${store.getters.conversionRange()}%`,
    additionalValue: `(${store.getters.conversionRange(comparisonYear, comparisonMonth)}%)`,
    additionalPercentage: calculateChangePercentage(
      store.getters.conversionRange(),
      store.getters.conversionRange(comparisonYear, comparisonMonth),
    ),
  },
  {
    _id: 2,
    title: "Average visit value",
    value: `$ ${store.getters.averageVisitValue()}`,
  },
];

describe('KpiSet.vue', () => {
  const kpiSet = mount(KpiSet, {
    store, localVue, utils, propsData: {
      items: itemsOfTotalSales,
    }
  });

  it('number of kpi components is correct', () => {
    expect(kpiSet.findAllComponents({ name: 'Kpi' }).length).toBe(itemsOfTotalSales.length);
  });

  it('kpi title is visible', () => {
    const titleEl = kpiSet.getComponent({ name: 'Kpi' }).find('span');
    expect(titleEl.text()).toMatch('Conversion rate');
  });

  it('onversion range is rendered correctly', () => {
    const valueEl = kpiSet.getComponent({ name: 'Kpi' }).find('.value');
    expect(valueEl.text()).toMatch('1.74%');
  });

  it('calling conversionRange returns expectedly', () => {
    const myConversionRange = store.getters.conversionRange();
    expect(myConversionRange).toBe('1.74');
  });

  it('calling conversionRange with optional arguments returns expectedly', () => {
    const myConversionRange = store.getters.conversionRange(2000, 2);
    expect(myConversionRange).toBe('231.62');
  });
});


