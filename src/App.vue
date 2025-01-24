<template>
  <BaseCard :companies="stackData" v-if="!loading && !error" />
  <div v-if="loading">Lade Daten...</div>
  <div v-if="error">{{ error }}</div>
</template>

<script>
import apiService from '@/services/apiService';
import BaseCard from './components/BaseCard.vue';
import '@/assets/fonts/fonts.css';

export default {
    name: 'App',
    components: { BaseCard },
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
};
</script>

<style>
body {
    margin: 0;
    height: 100vh;
    background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
    color: white;
    font-family: 'Rubik', sans-serif;
    padding: 16px;
}

</style>
