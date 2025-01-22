<template>
  <BaseCard>
    <p>Hallo Welt</p>
  </BaseCard>
</template>

<script>


import BaseCard from "./components/BaseCard.vue";

const sheetUrl = 'https://docs.google.com/spreadsheets/d/1m3h9Xce3SRMaq20li2Qg4HuSZowwxQSd9FkQmeuI7Dw/export?format=csv&gid=1248043629';

fetch(sheetUrl)
  .then(response => response.text()) // CSV als Text abrufen
  .then(csvData => {                          
    const rows = csvData.split('\n');  // CSV in Zeilen aufteilen
    const splitCsvRow = (row) => {  // Funktion zum sicheren Splitten einer CSV-Zeile
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;   // Regex: Findet Kommas außerhalb von Anführungszeichen
      return row.split(regex).map(value => {
        
        if (value.startsWith('"') && value.endsWith('"')) {   // Entfernt umschließende Anführungszeichen, falls vorhanden
          return value.slice(1, -1).replace(/""/g, '"'); // Entfernt doppelte Anführungszeichen
        }
        return value.trim();
      });
    };
    // getSpecificRows(rows);
    const quarter = splitCsvRow(rows[2]);   // Zeile 16 auslesen (Index 15 wegen 0-basierter Indizierung)
    const revenue = splitCsvRow(rows[4]);
    const netIncome = splitCsvRow(rows[35]);
    const grossMargin = splitCsvRow(rows[22]);
    getSpecificRows(quarter, revenue, netIncome, grossMargin);
  })
  .catch(error => {
    console.error('Fehler beim Abrufen der Daten:', error);
  });

  function getSpecificRows(quarter, revenue, netIncome, grossMargin) {
    const name = quarter.slice(0, 1);   // Bereich C3 bis O3 extrahieren (Index 2 bis 34)
    const finalName = name[0].trim();
    const rev = revenue.slice(2, 35); 
    const inc = netIncome.slice(2, 35); 
    const mar = grossMargin.slice(2, 35); 
    const qua = quarter.slice(2, 35); 
    console.log('Quarter:', qua);
    stringToFloat(rev, inc, mar);
    console.log('Name:', finalName);
    
  }

  function stringToFloat(rev, inc, mar) {
    // Funktion zur Umwandlung von Zahlen mit Kommas in Gleitkommazahlen
    const convertToFloat = (str) => {
    const cleanStr = str.replace(/"/g, '').replace(/,/g, '.'); // Entfernt Anführungszeichen und ersetzt Kommas durch Punkte
    return parseFloat(cleanStr); // Wandelt in eine Gleitkommazahl um
    };

    // Funktion zur Umwandlung von Prozentwerten in Dezimalzahlen
    const convertToDecimal = (str) => {
    const cleanStr = str.replace('%', ''); // Entfernt das Prozentzeichen
    return parseFloat(cleanStr) / 100; // Teilt durch 100, um Dezimalzahl zu erhalten
    };

    // Umwandlungen
    const revenueFloats = rev.map(convertToFloat);
    const netIncomeFloats = inc.map(convertToFloat);
    const grossMarginDecimals = mar.map(convertToDecimal);
    console.log('Revenue:', revenueFloats);
    console.log('Net Income:', netIncomeFloats);
    console.log('Gross Margin:', grossMarginDecimals);
  }


export default {
  name: 'App',
  components: {
    BaseCard   
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  width: 100vw;
  min-height: 100vh;
  padding: 100px;
  box-sizing: border-box;
}
</style>
