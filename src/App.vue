<!-- src/App.vue -->
<template>
    <div id="app">
        <nav>
            <ul class="nav-links">
                <li
                    :class="{
                        active:
                            currentPage === 'tierlist' &&
                            selectedId === '67ab34e773e157be7b23b0dc',
                    }"
                    @click="goToTierList('67ab34e773e157be7b23b0dc')"
                >
                    G3 Tier List
                </li>
                <li
                    :class="{
                        active:
                            currentPage === 'tierlist' &&
                            selectedId === '67ab3d6273e157be7b23b0e1',
                    }"
                    @click="goToTierList('67ab3d6273e157be7b23b0e1')"
                >
                    G1 Tier List
                </li>
                <li
                    :class="{
                        active:
                            currentPage === 'tierlist' &&
                            selectedId === '67ab3e0d73e157be7b23b0e6',
                    }"
                    @click="goToTierList('67ab3e0d73e157be7b23b0e6')"
                >
                    Conq Tier List
                </li>
                <!-- Lien pour accéder à la page d'explication -->
                <li
                    :class="{ active: currentPage === 'about' }"
                    @click="currentPage = 'about'"
                >
                    À propos
                </li>
            </ul>
            <div class="toggles" v-if="currentPage === 'tierlist'">
                <!-- Case pour afficher/masquer les monstres Light/Dark -->
                <label class="toggle-lightdark">
                    <input type="checkbox" v-model="showLightDark" />
                    Afficher monstres Light/Dark
                </label>
                <!-- Case pour surligner le meilleur monstre par élément -->
                <label class="toggle-highlight">
                    <input type="checkbox" v-model="highlightBest" />
                    Surligner le meilleur par élément
                </label>
            </div>
        </nav>

        <!-- Affichage conditionnel selon la page sélectionnée -->
        <div v-if="currentPage === 'tierlist'">
            <TierList
                :id="selectedId"
                :showLightDark="showLightDark"
                :highlightBest="highlightBest"
            />
        </div>
        <div v-else-if="currentPage === 'about'">
            <About />
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import TierList from "./components/TierList.vue";
import About from "./components/About.vue";

export default {
    name: "App",
    components: { TierList, About },
    setup() {
        // Par défaut, on affiche la Tier List et le premier ID sélectionné
        const currentPage = ref("tierlist");
        const selectedId = ref("67ab34e773e157be7b23b0dc");
        const showLightDark = ref(true);
        const highlightBest = ref(false);

        // Fonction pour revenir à la page Tier List en sélectionnant un ID
        const goToTierList = (id) => {
            selectedId.value = id;
            currentPage.value = "tierlist";
        };

        return {
            currentPage,
            selectedId,
            showLightDark,
            highlightBest,
            goToTierList,
        };
    },
};
</script>

<style>
/* Style global */
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f9f9f9;
    padding: 20px;
}

/* Barre de navigation */
nav {
    background: #333;
    color: #fff;
    padding: 10px 20px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}

.nav-links {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}

.nav-links li {
    margin-right: 20px;
    cursor: pointer;
    padding: 5px 10px;
}

.nav-links li.active {
    font-weight: bold;
    text-decoration: underline;
}

.toggles {
    display: flex;
    align-items: center;
    gap: 15px;
}

.toggle-lightdark,
.toggle-highlight {
    display: flex;
    align-items: center;
    font-size: 0.9em;
    color: #fff;
}

.toggle-lightdark input,
.toggle-highlight input {
    margin-right: 5px;
}
</style>
