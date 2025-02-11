<!-- src/components/MonsterCard.vue -->
<template>
    <div
        class="monster-card"
        :class="{ highlight: highlight }"
        @mouseover="showInfo = true"
        @mouseleave="showInfo = false"
    >
        <div class="image-container">
            <img
                class="monster-img"
                :src="monster.monster.img_url"
                :alt="monster.monster.name"
            />
        </div>
        <!-- Zone d'infos avec l'icône et le nom -->
        <div class="monster-info">
            <div class="element-icon">
                <img :src="elementIconUrl" alt="Element icon" />
            </div>
            <div class="monster-name">{{ monster.monster.name }}</div>
        </div>
        <div class="monster-score">Score: {{ monster.score.toFixed(2) }}</div>
        <!-- Affichage des statistiques au hover -->
        <div v-if="showInfo" class="stats-overlay">
            <h5>Statistiques actuelles</h5>
            <p>Winrate: {{ (monster.winrate * 100).toFixed(2) }}%</p>
            <p>Pickrate: {{ (monster.pickrate * 100).toFixed(2) }}%</p>
            <p>Banrate: {{ (monster.banrate * 100).toFixed(2) }}%</p>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
    name: "MonsterCard",
    props: {
        monster: { type: Object, required: true },
        highlight: { type: Boolean, default: false },
    },
    setup(props) {
        const showInfo = ref(false);
        // On convertit l'élément en minuscules pour construire l'URL de l'icône
        const elementIconUrl = computed(() => {
            const element = (
                props.monster.monster.element || "dark"
            ).toLowerCase();
            return `https://www.swranking.com/image/static/element/${element}.png`;
        });
        return { showInfo, elementIconUrl };
    },
};
</script>

<style>
.monster-card {
    background: #eaeaea;
    border-radius: 5px;
    padding: 8px;
    width: 120px;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s;
}

.monster-card:hover {
    transform: scale(1.05);
}

/* Ajout du style pour le surlignage */
.monster-card.highlight {
    background-color: #ffd700; /* fond doré */
}

.monster-img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 4px;
}

.monster-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    gap: 5px;
}

.element-icon {
    background: transparent;
    padding: 1px;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.element-icon img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
}

.monster-name {
    font-weight: bold;
    font-size: 1em;
}

.monster-score {
    margin-top: 3px;
    font-size: 0.9em;
    color: #555;
}

.stats-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 0.8em;
    padding: 5px;
}
</style>
