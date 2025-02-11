<template>
    <div class="about">
        <h1>À propos de ce site</h1>
        <p>
            Ce site est dédié à la consultation de Tier Lists de monstres,
            classées selon leurs performances et statistiques. Vous pouvez
            naviguer entre différentes Tier Lists, filtrer par élément et
            surligner le meilleur monstre de chaque élément.
        </p>
        <div class="credits">
            <h2>Crédits</h2>
            <p>
                Créé par
                <strong
                    ><a href="https://github.com/B4tiste" target="_blank"
                        >B4tiste</a
                    ></strong
                >
                &
                <strong
                    ><a href="https://github.com/shvvkz" target="_blank"
                        >shvvkz</a
                    ></strong
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
    background: #2b2b2b;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    max-width: 800px;
    margin: 0 auto;
    color: #ddd;
    transition: background 0.3s ease;
}

.about h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
}

.about p {
    line-height: 1.6;
    margin-bottom: 15px;
    text-align: justify;
    color: #ccc;
}

.credits {
    margin-top: 30px;
    text-align: center;
}

.credits h2 {
    margin-bottom: 10px;
    color: #fff;
}

.credits a {
    color: #66afe9;
    text-decoration: none;
}

.credits a:hover {
    text-decoration: underline;
}
</style>
