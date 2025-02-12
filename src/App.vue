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
                    <img
                        src="https://www.swranking.com/image/static/level/g3.png"
                        alt="G3 Tier List"
                    />
                </li>
                <li
                    :class="{
                        active:
                            currentPage === 'tierlist' &&
                            selectedId === '67ab3d6273e157be7b23b0e1',
                    }"
                    @click="goToTierList('67ab3d6273e157be7b23b0e1')"
                >
                    <img
                        src="https://www.swranking.com/image/static/level/g1.png"
                        alt="G1 Tier List"
                    />
                </li>
                <li
                    :class="{
                        active:
                            currentPage === 'tierlist' &&
                            selectedId === '67ab3e0d73e157be7b23b0e6',
                    }"
                    @click="goToTierList('67ab3e0d73e157be7b23b0e6')"
                >
                    <img
                        src="https://www.swranking.com/image/static/level/c3.png"
                        alt="Conq Tier List"
                    />
                </li>
                <!-- Lien pour accéder à la page d'explication -->
                <li
                    :class="{ active: currentPage === 'about' }"
                    @click="currentPage = 'about'"
                >
                    À propos
                </li>
            </ul>

            <!-- Zone de droite de la nav (affichée uniquement sur la page Tier List) -->
            <div class="nav-right" v-if="currentPage === 'tierlist'">
                <!-- Barre de recherche à gauche -->
                <div class="search-bar">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Rechercher un monstre..."
                        @keyup.enter="handleSearch"
                    />
                    <button @click="handleSearch">
                        <img src="/assets/magnifying-glass.png" alt="Loupe"/>
                    </button>
                </div>
                <!-- Les cases à cocher (toggles) -->
                <div class="toggles">
                    <label class="toggle-lightdark">
                        <input type="checkbox" v-model="showLightDark" />
                        Afficher les monstres Lumière et Ténèbres
                    </label>
                    <label class="toggle-highlight">
                        <input type="checkbox" v-model="highlightBest" />
                        Mettre en valeur le meilleur monstre par élément
                    </label>
                </div>
            </div>
        </nav>

        <!-- Affichage conditionnel selon la page sélectionnée -->
        <div v-if="currentPage === 'tierlist'">
            <TierList
                ref="tierListRef"
                :id="selectedId"
                :showLightDark="showLightDark"
                :highlightBest="highlightBest"
            />
        </div>
        <div v-else-if="currentPage === 'about'">
            <About />
        </div>

        <!-- Bouton de retour en haut affiché uniquement si besoin -->
        <button
            v-if="showScrollButton"
            class="scroll-to-top"
            @click="scrollToTop"
        >
            Retour en haut
        </button>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import TierList from "./components/TierList.vue";
import About from "./components/About.vue";

export default {
    name: "App",
    components: { TierList, About },
    setup() {
        const currentPage = ref("tierlist");
        const selectedId = ref("67ab34e773e157be7b23b0dc");
        const showLightDark = ref(true);
        const highlightBest = ref(false);
        const searchQuery = ref("");

        // Référence sur le composant TierList
        const tierListRef = ref(null);

        const goToTierList = (id) => {
            selectedId.value = id;
            currentPage.value = "tierlist";
        };

        // Méthode appelée depuis la barre de recherche
        const handleSearch = () => {
            if (tierListRef.value && searchQuery.value.trim()) {
                tierListRef.value.scrollToMonster(searchQuery.value);
            }
        };

        // Méthode pour défiler vers le haut de la page
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };

        // Variable réactive pour afficher/cacher le bouton "Retour en haut"
        const showScrollButton = ref(false);

        // Fonction qui vérifie la position du scroll
        const checkScroll = () => {
            showScrollButton.value = window.scrollY > 100;
        };

        // Ajout de l'écouteur lors du montage et suppression lors du démontage
        onMounted(() => {
            window.addEventListener("scroll", checkScroll);
        });
        onUnmounted(() => {
            window.removeEventListener("scroll", checkScroll);
        });

        return {
            currentPage,
            selectedId,
            showLightDark,
            highlightBest,
            searchQuery,
            goToTierList,
            tierListRef,
            handleSearch,
            scrollToTop,
            showScrollButton,
        };
    },
};
</script>

<style>
/* Style global */
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #121212;
    padding: 20px;
    color: #ddd;
}

/* Barre de navigation */
nav {
    background: #1e1e1e;
    color: #fff;
    padding: 10px 20px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
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
    transition: background 0.3s ease, color 0.3s ease;
}

.nav-links li:hover {
    background: #333;
    border-radius: 5px;
}

.nav-links li.active {
    font-weight: bold;
    text-decoration: underline;
    background: #333;
    border-radius: 5px;
}

/* Taille fixe pour les images de la barre de navigation */
.nav-links img {
    width: 50px;
    height: 18px;
    object-fit: contain;
    display: block;
    margin: auto;
}

/* Conteneur pour la zone de droite (recherche + toggles) */
.nav-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

/* Styles pour la barre de recherche */
.search-bar input {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-bar {
    display: flex;
    align-items: center;
}

.search-bar button {
    padding: 5px;
    border: none;
    border-radius: 25%;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-bar button:hover {
    background-color: #333;
}

.search-bar img {
    width: 30px;
    height: 30px;
}

/* Styles pour les toggles (inchangés) */
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

.toggles label input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #ddd;
    border-radius: 4px;
    background-color: #1e1e1e;
    margin-right: 8px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

.toggles label input[type="checkbox"]:checked {
    background-color: #2196f3;
    border-color: #2196f3;
}

.toggles label input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 0px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

/* Bouton de retour en haut placé en haut, centré horizontalement */
.scroll-to-top {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 15px;
    font-size: 14px;
    background-color: #2196f3;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 1000;
}

.scroll-to-top:hover {
    background-color: #1976d2;
}
</style>
