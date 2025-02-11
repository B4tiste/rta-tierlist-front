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

        const titleMapping = {
            "67ab34e773e157be7b23b0dc": "Tier List des Monstres G3",
            "67ab3d6273e157be7b23b0e1": "Tier List des Monstres G1",
            "67ab3e0d73e157be7b23b0e6": "Tier List des Monstres Conq",
        };

        const pageTitle = computed(() => titleMapping[props.id] || "Tier List");

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
    background: #3a3a3a;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    color: #f0f0f0;
    transition: background 0.3s ease;
}

.tier-header {
    font-size: 1.5em;
    margin-bottom: 10px;
    border-bottom: 1px solid #555;
    padding-bottom: 5px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #fff;
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
