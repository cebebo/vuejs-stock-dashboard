<template>
    <div class="value-card">
        <div class="dflex logo">
            <img :src="logo"/>
            <p class="company-name">{{ name }}</p>
        </div>
        <div>
            <p  class="quarter">Revenue: {{ quarter }}</p>
            <div class="dflex spaceBetween">
                <p class="revenue">{{ revenue.toFixed(2) }}</p>
                <div>
                    <p class="changes" 
                    :class="{'positive': revenueDifference >= 0, 'negative': revenueDifference < 0}">
                    {{ formatValue(revenueDifference) }} &nbsp; {{ arrow(revenueDifference) }}</p>
                    <p class="changes" 
                    :class="{'positive': revenueRatio >= 1, 'negative': revenueRatio < 1}">
                    {{ formatPercentage(revenueRatio) }}</p>                    
                </div>
            </div>
        </div>
        <p class="foot-line">In Bill USD</p>
    </div>
</template>

<script>

export default {
    name: 'ValueCard',
    props: {
        name: {
            type: String,
            required: true,
        },
        quarter: {
            type: String,
            required: true,
        },
        revenue: {
            type: Number,
            required: true,
        },
        prevRevenue: {
            type: Number,
            required: true,
        },
        grossMargin: {
            required: true,
        },
        logo: {
            type: String,
            required: false,
            default: '', // Optional: Default-Logo, falls kein spezifisches vorhanden ist
        },
    },
    
    computed: {
        revenueDifference() {
            return this.revenue - this.prevRevenue;
        },
        revenueRatio() {
            return this.prevRevenue !== 0 ? this.revenue / this.prevRevenue : 0;
        },
    },
    methods: {
        formatValue(value) {
            const sign = value > 0 ? '+' : '';
            return `${sign}${value.toFixed(2)}`;
        },
        formatPercentage(ratio) {
            const percentage = (ratio - 1) * 100; // Verhältnis in Prozentsatz umwandeln
            const sign = percentage > 0 ? '' : '';
            return `${sign}${percentage.toFixed(2)} %`;
        },
        arrow(value) {
            const arrow = value > 0 ? ' ↑' : ' ↓';
            return arrow
        }
    },
};
</script>

<style scoped>
.value-card {
    background-color: #011F35;
    border-radius: 16px;
    min-width: 150px;
    padding: 20px 24px;
    color: white;
    margin-right: 12px;
}

div {
    margin-top: 6px;
    margin-bottom: 6px;
}

.dflex {
    display: flex;
    align-items: center;
}

.spaceBetween {
    justify-content: space-between;
}

.logo img {
    height: 20px;
    width: auto;
    margin-right: 12px;
}

p {
    margin: 0;
    font-family: 'Rubik';
}

.company-name {
    font-size: 16px;
    font-weight: 500;
}

.quarter {
    font-size: 12px;
}

.revenue {
    font-size: 24px;
    font-weight: 500;
}

.changes {
    font-size: 13px;
    font-weight: 500;
}

.changes.positive {
    color: #3BA752;
}

.changes.negative {
    color: #C41C1C;
}

.foot-line {
    font-size: 8px;
}

</style>
