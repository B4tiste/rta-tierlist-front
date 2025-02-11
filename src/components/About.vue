<!-- src/components/About.vue -->
<template>
    <div class="about">
        <h1>À propos de ce site</h1>
        <p>
            Ce site est dédié à la consultation de Tier Lists de monstres,
            classées selon leurs performances et statistiques. Vous pouvez
            naviguer entre différentes Tier Lists, filtrer par élément et
            surligner le meilleur monstre de chaque élément.
        </p>
        <!-- <p>Les données sont récupérées en temps réel depuis une API dédiée.</p> -->
        <div class="credits">
            <h2>Crédits</h2>
            <p>
                Créé par
                <strong
                    ><a href="https://github.com/B4tiste">B4tiste</a></strong
                >
                sous l'impulsion de <strong>Addict/Storm/Qhaao</strong>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "About",
};
</script>

<style scoped>
.about {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
}
.about h1 {
    text-align: center;
    margin-bottom: 20px;
}
.about p {
    line-height: 1.6;
    margin-bottom: 15px;
    text-align: justify;
}
.credits {
    margin-top: 30px;
    text-align: center;
}
.credits h2 {
    margin-bottom: 10px;
}
</style>
