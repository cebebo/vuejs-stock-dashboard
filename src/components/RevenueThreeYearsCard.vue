<template>
    <div class="chart-card">
      <p>Revenue last 3 years</p>
      <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script>

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
    name: 'RevenueThreeYearsCard',
    props: {
    labels: Array, // Die letzten 12 Quartale
    datasets: Array, // Array mit Daten für jede Firma
  },
    mounted() {
      this.createChart(); 
    },
    methods: {
    createChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels, // Quartalsdaten
          datasets: this.datasets, // Daten der Firmen
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: {
                color: '#ffffff', // Schriftfarbe der Legende
                boxWidth: 32,     // Breite der farbigen Rechtecke
                boxHeight: 12,    // Höhe der farbigen Rechtecke
                borderWidth: 1,   // Weißer Rahmen um die Rechtecke
                generateLabels: (chart) => {
                  const datasets = chart.data.datasets;
                  return datasets.map((dataset, i) => ({
                  text: dataset.label,                  // Firmenname
                  fillStyle: dataset.borderColor,       // Füllfarbe entspricht der Linienfarbe
                  strokeStyle: '#ffffff',               // Rahmenfarbe auf Weiß setzen
                  lineWidth: 1,
                  hidden: !chart.isDatasetVisible(i),
                  index: i,
                  fontColor: '#ffffff',                 // Textfarbe auf Weiß setzen
                  color: '#ffffff',
          }));
        }
              }
            },
          },
          scales: {
            x: {
              title: {
                display: false,
                text: 'Quarters',
              },
              grid: {
                color: '#FFF',
                lineWidth: 1,
              },
              ticks: {
                color: '#FFF',
              },
            },
            y: {
              title: {
                display: false,
                text: 'Revenue (in USD)',
              },
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
}

</script>

<style scoped>

.main-chard {
    background-color: #011F35;
    border-radius: 16px;
    padding: 20px 32px 20px 32px;
    color: white;
}

.chart-card {
  width: 750px;
  height: 500px;
  background-color: #011f35;
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
}

p{
  font-size: 20px;
  font-weight: 600;
  padding-left: 32px;
}

</style>