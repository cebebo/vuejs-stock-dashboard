<template>
  <div class="dflex center">
    <div class="blueBox quarder"></div>
    <div class="blueBox rounded"></div>
    <h2>The Magnificent Seven Companies</h2>
  </div>
  <div v-if="loading" style="margin-top: 30vh;">
    Loading datalist...<br>
    <img src="./assets/img/loading.gif">
  </div>
  <div v-if="error">{{ error }}</div>
  <BaseCard :companies="stackData" v-if="!loading && !error" style="margin-top: 20vh;"/>
  <div class="dflex">
    <RevenueThreeYearsCard
        :labels="getLastQuarters(-12)"
        :datasets="prepareDatasets('revenue', -12)"
         v-if="!loading && !error"
    />
    <RevenueBreakdownCard
        :labels="getLastQuarters(-4)"
        :chartData="prepareDatasetsForTTM('revenue', -4)"
         v-if="!loading && !error"
    />
  </div>
  <div class="dflex" style="margin-top: 50px;">
    <NetIncomeCard
        :chartData="prepareDatasetsForTTM('netIncome', -4)"
         v-if="!loading && !error"
    />
    <GrossMarginCard
        :chartData="prepareDatasetsForTTM('grossMargin', -1)"
         v-if="!loading && !error"
    />
    <RevenueGrowthCard
        :chartData="prepareDatasetsForReGro('grossMargin', -4)"
         v-if="!loading && !error"
    />
  </div>
  
  
</template>

<script>
import apiService from '@/services/apiService';
import BaseCard from './components/BaseCard.vue';
import '@/assets/fonts/fonts.css';
import RevenueBreakdownCard from './components/RevenueBreakdownCard.vue';
import NetIncomeCard from './components/NetIncomeCard.vue';
import GrossMarginCard from './components/GrossMarginCard.vue';
import RevenueGrowthCard from './components/RevenueGrowthCard.vue';
import RevenueThreeYearsCard from './components/RevenueThreeYearsCard.vue';



export default {
    name: 'App',
    components: { BaseCard, RevenueBreakdownCard, NetIncomeCard, GrossMarginCard, RevenueGrowthCard, RevenueThreeYearsCard },
    data() {
        return {
            stackData: [],
            loading: true,
            error: null,
        };
    },
    async created() {
        try {
            await apiService.fetchData();
            this.stackData = apiService.getStackData();
        } catch (err) {
            this.error = 'Fehler beim Laden der Daten: ' + err.message;
        } finally {
            this.loading = false;
        }
    },
    

    methods: {
        getLastQuarters(period = -12) {
          // Die letzten 12 Quartale aus der ersten Firma (alle Firmen haben gleiche Quartale)
          return this.stackData[3].quarters.slice([period]);
        },

        prepareDatasets(dataKey = 'revenue', period = -12) {
          // Farben für jede Firma
          const colors = [
            '#093A52',
            '#11546F',
            '#196F8C',
            '#218AA8',
            '#29A5C5',
            '#31BFE2',
            '#39DAFF',
          ];
          // Datasets für jede Firma vorbereiten
          
          return this.stackData.map((company, index) => ({
            label: company.name,
            data: company[dataKey].slice([period]), // Letzte 12 Revenue-Werte
            borderColor: colors[index],
            borderWidth: 2,
            backgroundColor: colors[index] + '33', // Transparente Hintergrundfarbe
            tension: 0.2,
            fill: false,
          }));
        },

        prepareDatasetsForTTM(dataKey = 'revenue', period = -4) {
           // Farben für jede Firma
            const colors = [
              '#093A52',
              '#11546F',
              '#196F8C',
              '#218AA8',
              '#29A5C5',
              '#31BFE2',
              '#39DAFF',
            ];

            // Berechne für jede Firma die Summe der letzten `period` Werte
            const summedData = this.stackData.map(company => {
              const dataValues = company[dataKey].slice(period); 
              return dataValues.reduce((acc, value) => acc + value, 0);
            });

            // Rückgabe eines einzigen Datensatzes für das Doughnut-Chart
            return {
              labels: this.stackData.map(company => company.name),  // Firmennamen als Labels
              datasets: [{
                data: summedData,  // Summen der Umsätze
                backgroundColor: colors,  // Farben für jede Firma
                borderColor: '#ffffff',   // Weißer Rahmen um die Segmente
                borderWidth: 1,
              }]
            };
          },



          prepareDatasetsForReGro(dataKey = 'revenue', period = -4) {
            // Farben für die 4 Quartale
            const quarterColors = [
              '#093A52',
              '#196F8C',
              '#29A5C5',
              '#39DAFF'
            ];
           
            // Namen der letzten 4 Quartale
            const quarterLabels = this.getLastQuarters(period);

            // Labels für die X-Achse (Firmennamen)
            const companyNames = this.stackData.map(company => company.name);

            // Erstelle ein Dataset für jedes Quartal
            const datasets = quarterLabels.map((quarter, quarterIndex) => {
              return {
                label: quarter, // Quartalsname in der Legende
                backgroundColor: quarterColors[quarterIndex],
                data: this.stackData.map(company => company[dataKey].slice(period)[quarterIndex]), // Revenue-Wert des aktuellen Quartals
                borderColor: '#ffffff',
                borderWidth: 1,
              };
            });

            return {
              labels: companyNames, // Firmennamen auf der X-Achse
              datasets: datasets // Array von Datasets für die 4 Quartale
            };
          },

    },
}


</script>

<style>
body {
    margin: 0;
    width: 100%;
}

#app {
    height: 160vh;
    background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
    color: white;
    font-family: 'Rubik', sans-serif;
    padding: 16px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dflex {
    display: flex;
}

h2 {
  font-size: 36px;
  font-weight: 500;
  padding: 32px;
}

.blueBox {
  height: 32px;
  background-color: #39DAFF;
  
}

.quarder {
  width: 20vw;
}

.rounded {
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  width: 32px;
}

.center {
  align-items: center;
  position: absolute;
  left: 0;
}

@media(max-width: 1450px) {
  
  .dflex {
    flex-direction: column;
    align-items: center;
  }

  #app {
    height: 350vh;
  }

  .center {
    flex-direction: row !important;
  }

}

</style>
