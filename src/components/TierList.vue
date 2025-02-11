<!-- src/components/TierList.vue -->
<template>
    <div>
        <!-- Le titre change en fonction de l'ID de la TL -->
        <h1>{{ pageTitle }}</h1>
        <!-- Pour chaque tier non vide, on affiche un bloc "tier" -->
        <div v-for="tier in filteredTierList" :key="tier.rank" class="tier">
            <div class="tier-header">
                <!-- Vignette colorée associée au rang -->
                <span
                    class="tier-badge"
                    :style="{ backgroundColor: colorMapping[tier.rank] }"
                ></span>
                {{ formatRank(tier.rank) }}
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
        // Ordre des rangs
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

        // Chargement initial et rechargement lors du changement d'ID
        onMounted(() => {
            fetchTierList(props.id);
        });

        watch(
            () => props.id,
            (newId) => {
                fetchTierList(newId);
            }
        );

        // Calcul de la tier list triée et filtrée :
        // On crée un tableau d'objets { rank, monsters } et on ne garde que les tiers non vides.
        // Si showLightDark est false, on exclut les monstres avec element "light" ou "dark".
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

        // Calcul du meilleur monstre par élément parmi ceux affichés
        const bestMonsters = computed(() => {
            // Aplatir toutes les cartes affichées
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
            // Retourne un mapping : élément -> id du meilleur monstre
            const mapping = {};
            for (const element in bestMapping) {
                mapping[element] = bestMapping[element].monster._id;
            }
            return mapping;
        });

        // Formatage du nom des rangs
        const formatRank = (rank) => {
            const mapping = {
                sssMonster: "SSS Tier",
                ssMonster: "SS Tier",
                smonster: "S Tier",
                amonster: "A Tier",
                bmonster: "B Tier",
                cmonster: "C Tier",
                dmonster: "D Tier",
            };
            return mapping[rank] || rank;
        };

        // Mapping des ID vers les titres de page
        const titleMapping = {
            "67ab34e773e157be7b23b0dc": "Tier List des Monstres G3",
            "67ab3d6273e157be7b23b0e1": "Tier List des Monstres G1",
            "67ab3e0d73e157be7b23b0e6": "Tier List des Monstres Conq",
        };

        const pageTitle = computed(() => titleMapping[props.id] || "Tier List");

        // Mapping des couleurs (du rouge au violet) en fonction du rang
        const colorMapping = {
            sssMonster: "red",
            ssMonster: "orange",
            smonster: "yellow",
            amonster: "green",
            bmonster: "blue",
            cmonster: "indigo",
            dmonster: "violet",
        };

        return {
            filteredTierList,
            formatRank,
            pageTitle,
            colorMapping,
            bestMonsters,
        };
    },
};
</script>

<style>
.tier {
    margin-bottom: 30px;
    background: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.tier-header {
    font-size: 2em;
    margin-bottom: 10px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 5px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.tier-badge {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
.monster-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}
</style>
