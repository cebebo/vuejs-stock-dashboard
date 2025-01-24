// src/services/apiService.js

const companies = [
    {
        gid: 1248043629,
        company: 'Apple',
        revLine: 4,
        incLine: 35,
        marLine: 22,
        push: 0
    },
    {
        gid: 1790479069,
        company: 'Amazon',
        revLine: 8,
        incLine: 40,
        marLine: 14,
        push: 0
    },
    {
        gid: 561150333,
        company: 'Google',
        revLine: 4,
        incLine: 40,
        marLine: 30,
        push: 28
    },
    {
        gid: 1277615936,
        company: 'Meta',
        revLine: 4,
        incLine: 26,
        marLine: 10,
        push: 0
    },
    {
        gid: 244946188,
        company: 'Microsoft',
        revLine: 8,
        incLine: 29,
        marLine: 14,
        push: -1
    },
    {
        gid: 838783939,
        company: 'Nvidia',
        revLine: 4,
        incLine: 28,
        marLine: 10,
        push: -29
    },
    {
        gid: 674086900,
        company: 'Tesla',
        revLine: 13,
        incLine: 46,
        marLine: 27,
        push: 0
    },
]

const sheetUrl = 'https://docs.google.com/spreadsheets/d/1m3h9Xce3SRMaq20li2Qg4HuSZowwxQSd9FkQmeuI7Dw/export?format=csv&gid=';

let stackData = [];

const splitCsvRow = (row) => {
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/; // Findet Kommas außerhalb von Anführungszeichen
    return row.split(regex).map((value) => {
        if (value.startsWith('"') && value.endsWith('"')) {
            return value.slice(1, -1).replace(/""/g, '"'); // Entfernt doppelte Anführungszeichen
        }
        return value.trim();
    });
};

const convertToFloat = (str) => {
    const cleanStr = str.replace(/"/g, '').replace(/,/g, '.').replace('(', '').replace(')', '').replace('$', ''); // Entfernt Anführungszeichen und ersetzt Kommas durch Punkte
    return parseFloat(cleanStr);
};

const convertToDecimal = (str) => {
    const cleanStr = str.replace('%', ''); // Entfernt das Prozentzeichen
    return parseFloat(cleanStr) / 100;
};

function combineValues(quarter, revenue, netIncome, grossMargin, i) {
    return {
        name: companies[i].company,
        quarters: quarter.slice(2 + companies[i].push, 80),
        revenue: revenue.slice(2 + companies[i].push, 80).map(convertToFloat),
        netIncome: netIncome.slice(2 + companies[i].push, 80).map(convertToFloat),
        grossMargin: grossMargin.slice(2 + companies[i].push, 80).map(convertToDecimal)
    }
}

function checkForFails(fetchedData, i) {
    if (companies[i].company == 'Nvidia') {
        fetchedData.quarters.splice(-3);
        fetchedData.revenue.splice(0, 3);
        fetchedData.netIncome.splice(0, 3);
        fetchedData.grossMargin.splice(0, 3);
    }
    fetchedData.revenue = fetchedData.revenue.map(num => isNaN(num) ? 0 : num);
    fetchedData.netIncome = fetchedData.netIncome.map(num => isNaN(num) ? 0 : num);
    fetchedData.grossMargin = fetchedData.grossMargin.map(num => isNaN(num) ? 0 : num);
    for (let j = 0; j < fetchedData.quarters.length; j++) {
        if(fetchedData.quarters[j].length > 4) {
            let q = fetchedData.quarters[j].slice(0,2);
            let y = fetchedData.quarters[j].slice(-2);
            fetchedData.quarters[j] = y + q;
        }
    }
    return fetchedData;
}

const fetchData = async () => {
    try {
        for (let i = 0; i < 7; i++) {
            let apiSheet = sheetUrl + companies[i].gid;
            let response = await fetch(apiSheet);
            const csvData = await response.text();
            const rows = csvData.split('\n');
            const quarter = splitCsvRow(rows[2]);
            const revenue = splitCsvRow(rows[companies[i].revLine]);
            const netIncome = splitCsvRow(rows[companies[i].incLine]);
            const grossMargin = splitCsvRow(rows[companies[i].marLine]);
            let fetchedData = combineValues(quarter, revenue, netIncome, grossMargin, i);
            fetchedData = checkForFails(fetchedData, i);
            stackData.push(fetchedData);
            // console.log(companies[i].company, ':', companies[i].revLine, companies[i].incLine, companies[i].marLine);
        }
        console.log(stackData);
        return stackData;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        throw error;
    }
};

// Methode, um die aktuellen Daten abzurufen
const getStackData = () => {
    return stackData;
};

// Service exportieren
export default {
    fetchData,
    getStackData,
};
