import * as FetchCompet from './FetchCompets.js'

export default class Question {
    constructor() {
        this.league = null;
        this.season = null;
        this.answer = null;
        this.choices = null;;
    }

    // Genère et renvoie une question - 2 requetes
    async init(compets, fetchedCompet) {
        // Pour gérer le texte de chargement
        const textEtat = document.getElementById('textEtat');
        textEtat.innerText = `Initialisation de la question...`;

        // Générer un entier au hasard 
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        // Choix de la compétition
        textEtat.innerText = `Selection d'une compétition...`;
        const numLeague = getRandomInt(compets.length);
        const leagueName = compets[numLeague];
        const league = await FetchCompet.fetchCompetByName(leagueName, fetchedCompet); // 1 Requete

        // Récupération des saisons valides (avec un gagnant)
        textEtat.innerText = `Récupération des saisons valides...`;
        const seasonsList = [];
        for (let i = 0; i < league.seasons.length; ++i) {
            if (league.seasons[i].winner)
                seasonsList.push(league.seasons[i]);
        }

        // Choix de la saison
        const test = getRandomInt(seasonsList.length)
        const questionSeason = seasonsList[test];


        // Récupération des participants du championnat et création des choix
        textEtat.innerText = `Création des choix...`;
        let questionChoices = [];
        const allTeams = await FetchCompet.getCompetTeams(league.code); // 1 Requete
        // On choisit la place de la réponse
        const indexAnswer = getRandomInt(4);
        for (let i = 0; i < 4; ++i) {
            if (i == indexAnswer)
                // Si c'est la place de la réponse on la met à cet index
                questionChoices.push(questionSeason.winner.name);
            else {
                // Sinon, on génère une équipe aléatoire parmit les 10 meilleures du championnats
                while (true) {
                    const index = getRandomInt(10);
                    // On vérifie bien que l'équipe n'est pas déjà parmit les choix et n'est pas la réponse
                    if (!(questionChoices.includes(allTeams.teams[index].name))) {
                        if (!(allTeams.teams[index].name == questionSeason.winner.name)) {
                            questionChoices.push(allTeams.teams[index].name);
                            break;
                        }
                    }
                }
            }
        }

        //Gestion de l'affichage de la date
        const startDate = questionSeason.startDate.substring(0, 4);

        const seasonOrYear = () => {
            if (league.name === 'European Championship' || league.name === 'FIFA World Cup')
                return startDate;
            else {
                const startYear = questionSeason.startDate.substring(0, 4);
                return `${startYear}-${parseInt(startYear) + 1}`;
            }
        }

        textEtat.innerText = `Finalisation de la création de la question...`;

        // On assigne tout
        this.league = (leagueName + ' (' + league.area.name + ')');
        this.season = seasonOrYear();
        this.answer = questionSeason.winner.name;
        this.choices = questionChoices;
    }
}