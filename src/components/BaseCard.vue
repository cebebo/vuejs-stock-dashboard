<template>
  <div class="base-card">
      <div class="value-card-container">
          <ValueCard
              v-for="(company, index) in companies"
              :key="index"
              :name="company.name"
              :quarter="company.quarters[company.quarters.length - 1]"
              :revenue="company.revenue[company.revenue.length - 1]" 
              :prevRevenue="company.revenue[company.revenue.length - 2]"
              :grossMargin="(company.grossMargin[company.grossMargin.length - 1] * 100).toFixed(2)" 
              :logo="getLogoPath(company.name)"
            />
      </div>
    </div>
</template>

<script>
import ValueCard from './ValueCard.vue';

export default {
  name: 'BaseCard',
  components: { ValueCard },
  props: {
      companies: {
          type: Array,
          required: true,
      },
  },
  methods: {
      getLogoPath(companyName) {
          // Beispiel: Pfade für Logos
          const logos = {
              Apple: require('./../assets/img/Apple.png'),
              Amazon: require('./../assets/img/Amazon.png'),
              Google: require('./../assets/img/Google.png'),
              Meta: require('./../assets/img/Meta.png'),
              Microsoft: require('./../assets/img/Microsoft.png'),
              Nvidia: require('./../assets/img/Nvidia.png'),
              Tesla: require('./../assets/img/Tesla.png'),
          };
          return logos[companyName] || require('./../assets/img/default.png'); // Fallback-Logo
      },
  },
};
</script>

<style scoped>
.base-card {
  display: flex;
  gap: 16px;
  background-color: #023A6233;
  border-radius: 16px;
  padding: 24px 18px;
  overflow: hidden;
  max-width: 1430px;
  justify-content: center;
  width: 100%;
  height: 225px;
  box-sizing: border-box;
  margin-bottom: 42px;
}

.value-card-container {
  display: flex;
  gap: 16px;
  flex-wrap: nowrap;
  overflow-x: auto;
}

/* .scroll-arrow {
  border-radius: 50%;
  background-color: #39DAFF;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30px;
  min-width: 30px;
  max-height: 30px;
  max-width: 30px;
  box-sizing: border-box;
  color: black;
  font-weight: 500;
  font-size: 20px;
  z-index: 2;
}

.left {
  margin-left: -60px;
}

.right {
  margin-left: 130px;
} */

.value-card-container::-webkit-scrollbar {
    height: 8px; /* Höhe des horizontalen Scrollbalkens */
}

.value-card-container::-webkit-scrollbar-thumb {
    background-color: #011F35; /* Farbe des Scrollbalkens */
    border-radius: 4px; /* Abgerundete Ecken des Scrollbalkens */
}

.value-card-container::-webkit-scrollbar-thumb:hover {
    background-color: #073d64; /* Scrollbar-Farbe beim Hover */
}
</style>
