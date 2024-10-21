import Question from './Question'
import * as FetchCompets from './FetchCompets.js'

export default class Quizz {
    constructor() {
        this.questions = [];
    }

    async init() {
        const textEtat = document.getElementById('textEtat');
        textEtat.innerText = `Initialisation du quizz...`;
        const fetchedCompets = await FetchCompets.fetchCompets();
        const compets = await FetchCompets.getCompetsList(fetchedCompets);
        const questions = [];
        for (let i = 0; i < global.numberOfQuestions; ++i) {
            textEtat.innerText = `Création de la question ${i}...`;
            const question = new Question();
            await question.init(compets, fetchedCompets);
            questions.push(question);
            textEtat.innerText = `Ajout de la question ${1} au quizz...`;
        }
        textEtat.innerText = `Finalisation de la création du quizz...`;
        this.questions = questions;
    }

}