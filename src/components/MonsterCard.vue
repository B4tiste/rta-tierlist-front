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
            <h5>Stats</h5>
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
    background: #2b2b2b;
    border-radius: 10px;
    padding: 10px;
    width: 120px;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.monster-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
}

/* Surlignage d'un monstre (par exemple, le meilleur par élément) */
.monster-card.highlight {
    background-color: #5a4f1a;
}

/* Centrage de l'image dans la card */
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    height: 100px;
}

.monster-img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
}

.monster-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    gap: 5px;
    color: #f0f0f0;
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
    color: #aaa;
}

/* Modification de l'overlay pour déplacer le texte vers le haut */
.stats-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Aligne les éléments en haut */
    align-items: center;
    border-radius: 10px;
    padding: 0px 5px 5px; /* Augmente le padding en haut */
    opacity: 0;
    transition: opacity 0.3s ease;
}

/* Agrandissement du titre et réduction des marges entre éléments */
.stats-overlay h5 {
    font-size: 1.2em;
    margin-bottom: 5px;
}

.stats-overlay p {
    margin: 3px 0;
}

.monster-card:hover .stats-overlay {
    opacity: 1;
}
</style>
