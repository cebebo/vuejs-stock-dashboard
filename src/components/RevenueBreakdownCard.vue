<template>
    <div class="chart-card">
      <p>Revenue Breakdown Magnificent Seven</p>
      <canvas ref="chartCanvas"></canvas>
      <p class="smallText">In Billion USD TTM</p>
    </div>
</template>


<script>

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'RevenueBreakdownCard',
  props: {
    chartData: Object, // Die gesamte Chart-Datenstruktur wird übergeben
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      console.log('jetzt aber: ', this.chartData);
      new Chart(ctx, {
        type: 'doughnut',
        data: this.chartData, // Übergabe der vorbereiteten Daten
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1.5,
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: {
                color: '#ffffff', // Schriftfarbe der Legende
                boxWidth: 32,
                boxHeight: 12,
                borderWidth: 1,
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>

.main-chard {
    background-color: #011F35;
    border-radius: 16px;
    padding: 20px 32px 20px 32px;
    color: white;
    width: 494px;
    height: 500px;
}

.chart-card {
  width: 625px;
  height: 500px;
  background-color: #011f35;
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
  margin-left: 50px;
}

p{
  font-size: 20px;
  font-weight: 600;
  padding-left: 32px;
}

.smallText {
  font-size: 8px;
  font-weight: 400;
  padding-right: 32px;
  text-align: end;
}

</style>