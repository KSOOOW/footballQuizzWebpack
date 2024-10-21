import imgFleche from '../images/fleche.png'
import Quizz from '../scripts/Quizz'
import '../styles/quizz_page.css'
import Swal from 'sweetalert2';

export default class QuizzPage {

    constructor() {
        this.root = document.getElementById('app');
        this.container = null;
        this.quizz = null;
        this.INDEX_QUESTION = 0;
        this.answers = [];
    }

    countResult() {
        if (this.answers.length < global.numberOfQuestions)
            throw new Error("Nombre de réponses insuffisant");

        let score = 0;
        for (let i = 0; i < this.answers.length; ++i) {
            if (this.answers[i] == this.quizz.questions[i].answer)
                score += 1
        }
        return score;
    }

    starting(index) {
        if (this.quizz.questions[index].league == 'FIFA World Cup (World)')
            return 'En';
        else if (this.quizz.questions[index].league == 'European Championship (Europe)')
            return 'En';
        else
            return 'Lors de la saison';
    }

    displayQuestions() {
        this.container = document.createElement('div');
        this.root.appendChild(this.container);
        this.container.id = 'QuizzPage';
        this.container.classList.add('flexCenterColumn');

        const questionIndex = document.createElement('h1');
        questionIndex.innerText = `QUESTION ${this.INDEX_QUESTION + 1}/${this.quizz.questions.length}`;
        questionIndex.id = 'questionIndex';
        this.container.appendChild(questionIndex);

        const questionTitle = document.createElement('h1');

        questionTitle.innerText = `${this.starting(this.INDEX_QUESTION)} ${this.quizz.questions[this.INDEX_QUESTION].season}, quelle équipe a remporté la ${this.quizz.questions[this.INDEX_QUESTION].league} ?`;
        questionTitle.id = 'questionTitle';
        this.container.appendChild(questionTitle);

        // Boutons des choix
        const choicesContainer = document.createElement('div');
        choicesContainer.classList.add('flexCenterRow');
        this.container.appendChild(choicesContainer);

        //Bouton choix 1
        const buttonAnswer1 = document.createElement('button');
        buttonAnswer1.id = 'buttonAnswer1';
        buttonAnswer1.classList.add('buttonChoice');
        buttonAnswer1.textContent = this.quizz.questions[this.INDEX_QUESTION].choices[0];
        choicesContainer.appendChild(buttonAnswer1);
        buttonAnswer1.addEventListener('click', () => {
            this.choicePressed(0)
        });

        //Bouton choix 2
        const buttonAnswer2 = document.createElement('button');
        buttonAnswer2.id = 'buttonAnswer2';
        buttonAnswer2.classList.add('buttonChoice');
        buttonAnswer2.textContent = this.quizz.questions[this.INDEX_QUESTION].choices[1];
        choicesContainer.appendChild(buttonAnswer2);
        buttonAnswer2.addEventListener('click', () => {
            this.choicePressed(1)
        });

        //Bouton choix 3
        const buttonAnswer3 = document.createElement('button');;
        buttonAnswer3.id = 'buttonAnswer3';
        buttonAnswer3.classList.add('buttonChoice');
        buttonAnswer3.textContent = this.quizz.questions[this.INDEX_QUESTION].choices[2];
        choicesContainer.appendChild(buttonAnswer3);
        buttonAnswer3.addEventListener('click', () => {
            this.choicePressed(2)
        });

        //Bouton choix 4
        const buttonAnswer4 = document.createElement('button');
        buttonAnswer4.id = 'buttonAnswer4';
        buttonAnswer4.classList.add('buttonChoice');
        buttonAnswer4.textContent = this.quizz.questions[this.INDEX_QUESTION].choices[3];
        choicesContainer.appendChild(buttonAnswer4);
        buttonAnswer4.addEventListener('click', () => {
            this.choicePressed(3)
        });
    }

    displayResult() {
        this.container = document.createElement('div');
        this.root.appendChild(this.container);
        this.container.id = 'QuizzPageResult';
        this.container.classList.add('flexCenterColumn');

        const titleResult = document.createElement('h1');
        titleResult.id = 'titleResult';
        titleResult.textContent = 'Résultat du quizz';
        this.container.appendChild(titleResult);

        const resultDescContent = () => {
            if (this.countResult() == this.answers.length)
                return 'Bravo ! Vous avez répondu bon à toutes les questions.';
            else if (this.countResult() == 0)
                return 'Catastrophe... Vous avez répondu tout faux...';
            else if (this.countResult() == 1)
                return `Vous avez répondu juste à ${this.countResult()} question sur ${this.answers.length}.`; 
            else
                return `Vous avez répondu juste à ${this.countResult()} questions sur ${this.answers.length}.`;
        };

        const descResult = document.createElement('h1');
        descResult.textContent = resultDescContent();
        descResult.id = 'descResult';
        this.container.appendChild(descResult);

        const buttonQuit = document.createElement('button');
        buttonQuit.id = 'buttonQuit';
        buttonQuit.textContent = (`retour à l'accueil...`);
        buttonQuit.addEventListener('click', () => {
            window.router.navigateTo('WelcomePage');
        });

        this.container.appendChild(buttonQuit);

        const corrContainer = document.createElement('div');
        corrContainer.classList.add('flexCenterColumn');
        this.container.appendChild(corrContainer);

        const corrTitle = document.createElement('h1');
        corrTitle.innerText = 'Résumé des réponses :';
        corrTitle.id = 'corrTitle';
        corrContainer.appendChild(corrTitle);

        for (let i = 0; i < this.answers.length; ++i) {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('flexCenterColumn');
            answerDiv.classList.add('answerDiv');
            corrContainer.appendChild(answerDiv);

            const titleQuestion = document.createElement('h1');
            titleQuestion.innerText = `${i + 1}. ${this.starting(i)} ${this.quizz.questions[i].season}, quelle équipe a remporté la ${this.quizz.questions[i].league} ?`;
            titleQuestion.classList.add('titlequestion');
            answerDiv.appendChild(titleQuestion);

            const answerContainer = document.createElement('div');
            answerContainer.classList.add('flexCenterRow');
            answerContainer.classList.add('answercontainer');
            answerDiv.appendChild(answerContainer);

            // Choix de l'utilisateur
            const choiceDiv = document.createElement('div');
            choiceDiv.classList.add('flexCenterColumn');
            choiceDiv.classList.add('containertruc');
            answerContainer.appendChild(choiceDiv);

            if (this.answers[i] == this.quizz.questions[i].answer)
                choiceDiv.classList.add('color-green');
            else
                choiceDiv.classList.add('color-red');

            const choiceTitle = document.createElement('h2');
            choiceTitle.innerText = 'Votre choix';
            choiceTitle.classList.add('answerCorrTitle');
            choiceDiv.appendChild(choiceTitle);


            const choice = document.createElement('h2');
            choice.innerText = `${this.answers[i]}`;
            choice.classList.add('choiceCorrTitle');
            choiceDiv.appendChild(choice);

            //Flèche entre les deux
            const fleche = document.createElement('img');
            fleche.src = imgFleche;
            fleche.id = 'fleche';
            answerContainer.appendChild(fleche);

            // Correction / réponse
            const correctionDiv = document.createElement('div');
            correctionDiv.classList.add('flexCenterColumn');
            correctionDiv.classList.add('color-green');
            correctionDiv.classList.add('containertruc');
            answerContainer.appendChild(correctionDiv);

            const correctionTitle = document.createElement('h2');
            correctionTitle.innerText = 'La réponse';
            correctionTitle.classList.add('answerCorrTitle');
            correctionDiv.appendChild(correctionTitle);

            const answer = document.createElement('h2');
            answer.innerText = `${this.quizz.questions[i].answer}`;
            answer.classList.add('choiceCorrTitle');
            correctionDiv.appendChild(answer);
        }
    }

    async display() {
        try {
            const textEtat = document.createElement('h1');
            textEtat.id = 'textEtat';
            textEtat.innerText = 'Création du quizz...'
            this.root.appendChild(textEtat);

            const loading = document.createElement('div');
            loading.id = 'loading'
            loading.classList.add('loader');
            this.root.appendChild(loading);

            this.quizz = new Quizz();
            await this.quizz.init();

            this.root.removeChild(textEtat);
            this.root.removeChild(loading);

            this.displayQuestions();
        } catch (error) {
            console.log(error);
            window.router.navigateTo('WelcomePage');
            Swal.fire({
                icon: "error",
                title: "Moins vite !",
                text: "Par manque de budget, notre nombre de requêtes par minute est limité, attendez un peu...",
              });
        }

    }

    reloadQuestion() {
        const questionContainer = document.getElementById('QuizzPage');
        this.root.removeChild(questionContainer);
        this.displayQuestions();
    }

    choicePressed(numChoice) {
        this.answers.push(this.quizz.questions[this.INDEX_QUESTION].choices[numChoice]);
        this.INDEX_QUESTION += 1;
        if (this.INDEX_QUESTION < global.numberOfQuestions)
            this.reloadQuestion();
        else {
            const questionContainer = document.getElementById('QuizzPage');
            this.root.removeChild(questionContainer);
            this.displayResult()
        }
    }

    async closePage(){
        if(this.container){
            this.root.removeChild(this.container);
        }
        if(document.getElementById('textEtat')){
            const textEtat = document.getElementById('textEtat');
            const loading = document.getElementById('loading');
            this.root.removeChild(textEtat);
            this.root.removeChild(loading);
        }
    }
}