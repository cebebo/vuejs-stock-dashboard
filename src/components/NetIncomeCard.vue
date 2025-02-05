<template>
    <div class="chart-card">
      <p>Net Income TTM</p>
      <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script>

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'NetIncomeCard',
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
        type: 'bar',
        data: this.chartData, // Übergabe der vorbereiteten Daten
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
          plugins: {
            legend: {
              display: false,
              position: 'left',
              labels: {
                color: '#ffffff', // Schriftfarbe der Legende
                boxWidth: 32,
                boxHeight: 12,
                borderWidth: 1,
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: '#FFF',
                lineWidth: 1,
              },
              ticks: {
                color: '#FFF',
              },
            },
            y: {
              grid: {
                color: '#FFF',
                lineWidth: 1,
              },
              ticks: {
                color: '#FFF',
                stepSize: 30,
              },
              beginAtZero: true,
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
  width: 375px;
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
  font-weight: 450;
  padding-right: 32px;
  text-align: end;
}

</style>