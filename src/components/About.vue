<template>
    <div class="about">
        <h1>À propos de ce site</h1>
        <p>
            Bienvenue sur notre site dédié à la méta RTA de Summoners War ! En quête d'outils
            utiles pour la Communauté, nous avons développé
            <strong>une tier list unique</strong> retraçant
            <strong>la longévité des monstres</strong> dans le contenu
            <strong>Arène en Temps Réel (RTA)</strong>.
        </p>
        <p>
            Grâce aux données issues de
            <strong
                ><a href="https://m.swranking.com/#/" target="_blank"
                    >SWRT</a
                ></strong
            >, notre outil vous permet d'identifier les monstres qui restent
            performants au fil du temps dans ce mode compétitif. Que vous soyez
            un joueur débutant cherchant à bâtir une équipe solide ou un vétéran
            souhaitant optimiser vos compositions, notre tier list vous offre
            une vision claire de la durabilité des unités.
        </p>

        <p>
            Notre objectif est de fournir une ressource précise et constamment
            mise à jour pour aider les Invocateurs à faire des choix
            stratégiques éclairés.
        </p>

        <h1>Comment ça marche ?</h1>
        <p>
            Vous pouvez accéder aux différentes informations en fonction du rang (G3/G1/Autre) via les boutons situés en haut de la page
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
                sous l'impulsion de <strong>Qhaao</strong>
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

a {
    color: #66afe9;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
