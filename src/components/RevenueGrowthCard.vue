<template>
    <div class="chart-card">
      <p>Revenue Growth in % YoY</p>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    name: 'RevenueGrowthCard',
    props: {
      chartData: Object, // Die gesamte Chart-Datenstruktur wird übergeben
    },
    mounted() {
      this.createChart();
    },
    methods: {
      createChart() {
        const ctx = this.$refs.chartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'bar', // Vertikales Balkendiagramm
          data: this.chartData,
          options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.1,
            plugins: {
              legend: {
                display: true,
                position: 'right', // Legende rechts platzieren
                labels: {
                  color: '#ffffff',
                  boxWidth: 20,
                }
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} USD`;
                  }
                }
              }
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#ffffff',
                },
                stacked: false,
              },
              y: {
                title: {
                  display: true,
                  text: 'Revenue (in USD)',
                  color: '#ffffff',
                },
                grid: {
                  color: '#555555',
                },
                ticks: {
                  color: '#ffffff',
                },
                beginAtZero: true,
                stacked: false,
              }
            }
          }
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-card {
    width: 625px;
    height: 400px;
    background-color: #011f35;
    border-radius: 16px;
    padding: 16px;
    box-sizing: border-box;
    margin-left: 50px;
  }
  
  p {
    font-size: 20px;
    font-weight: 600;
    padding-left: 32px;
    color: white;
  }

  @media(max-width: 1450px) {

    .chart-card {
      margin-left: 0;
      width: 750px;
      height: 450px;
      margin-top: 50px;
    }

  }

</style>
  