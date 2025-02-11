<template>
    <div>
        <h1>Données du 28 Octobre 2024 au 02 Février 2025</h1>
        <!-- Utilisation de l'index pour déterminer la couleur du bandeau -->
        <div
            v-for="(tier, index) in filteredTierList"
            :key="tier.rank"
            class="tier"
        >
            <div
                class="tier-header"
                :style="{ backgroundColor: getHeaderColor(index) }"
            >
                <span class="rank-text">{{ formatRank(tier.rank) }}</span>
            </div>
            <div class="monster-container">
                <MonsterCard
                    v-for="monster in tier.monsters"
                    :key="monster.monster._id"
                    :monster="monster"
                    :highlight="
                        highlightBest &&
                        bestMonsters[monster.monster.element.toLowerCase()] ===
                            monster.monster._id
                    "
                />
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import MonsterCard from "./MonsterCard.vue";

export default {
    name: "TierList",
    components: { MonsterCard },
    props: {
        id: {
            type: String,
            required: true,
        },
        showLightDark: {
            type: Boolean,
            required: true,
        },
        highlightBest: {
            type: Boolean,
            required: true,
        },
    },
    setup(props) {
        const tierList = ref([]);
        // Ordre de vérification des rangs
        const ranks = [
            "sssMonster",
            "ssMonster",
            "smonster",
            "amonster",
            "bmonster",
            "cmonster",
            "dmonster",
        ];

        const fetchTierList = async (id) => {
            try {
                const response = await fetch(
                    `https://rta-tierlist-api-orst.shuttle.app/tierlists/${id}`
                );
                const data = await response.json();
                tierList.value = data.tierlist;
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération de la tier list:",
                    error
                );
            }
        };

        onMounted(() => {
            fetchTierList(props.id);
        });

        watch(
            () => props.id,
            (newId) => {
                fetchTierList(newId);
            }
        );

        const filteredTierList = computed(() => {
            return ranks
                .map((rank) => {
                    let list =
                        tierList.value.find((t) => t.rank === rank)
                            ?.list_monsters || [];
                    if (!props.showLightDark) {
                        list = list.filter((monster) => {
                            const el = monster.monster.element.toLowerCase();
                            return el !== "light" && el !== "dark";
                        });
                    }
                    list = list.slice().sort((a, b) => b.score - a.score);
                    return { rank, monsters: list };
                })
                .filter((tier) => tier.monsters.length > 0);
        });

        const bestMonsters = computed(() => {
            const allMonsters = filteredTierList.value.flatMap(
                (tier) => tier.monsters
            );
            const bestMapping = {};
            allMonsters.forEach((monster) => {
                const element = monster.monster.element.toLowerCase();
                if (
                    !bestMapping[element] ||
                    monster.score > bestMapping[element].score
                ) {
                    bestMapping[element] = monster;
                }
            });
            const mapping = {};
            for (const element in bestMapping) {
                mapping[element] = bestMapping[element].monster._id;
            }
            return mapping;
        });

        const formatRank = (rank) => {
            // On affiche uniquement le grade, sans le mot "Tier"
            const mapping = {
                sssMonster: "SSS",
                ssMonster: "SS",
                smonster: "S",
                amonster: "A",
                bmonster: "B",
                cmonster: "C",
                dmonster: "D",
            };
            return mapping[rank] || rank;
        };

        // Tableau des couleurs avec un effet "fade" (opacité 0.2)
        const headerColors = [
            "rgba(255, 0, 0, 0.2)", // Rouge
            "rgba(255, 165, 0, 0.2)", // Orange
            "rgba(255, 255, 0, 0.2)", // Jaune
            "rgba(0, 128, 0, 0.2)", // Vert
            "rgba(0, 0, 255, 0.2)", // Bleu
            "rgba(238, 130, 238, 0.2)", // Violet
        ];

        // Fonction qui attribue la couleur en fonction de l'index (la première catégorie affichée sera rouge)
        const getHeaderColor = (index) => {
            return headerColors[index % headerColors.length];
        };

        return {
            filteredTierList,
            formatRank,
            bestMonsters,
            getHeaderColor,
        };
    },
};
</script>

<style>
.tier {
    margin-bottom: 30px;
    background: #3a3a3a;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    color: #f0f0f0;
    transition: background 0.3s ease;
}

.tier-header {
    margin-bottom: 10px;
    padding: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    /* Un léger text-shadow pour améliorer la lisibilité sur fond coloré */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.rank-text {
    font-size: 3em;
    font-weight: bold;
}

.monster-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}
</style>
