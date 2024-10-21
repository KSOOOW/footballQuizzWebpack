import logo from '../images/game_logo.png'
import '../styles/welcome_page.css'

export default class WelcomePage {

    constructor() {
        this.root = document.getElementById('app');
        this.container = null;
    }

    display() {
        this.container = document.createElement('div')
        this.root.appendChild(this.container)
        this.container.id = 'welcomepage'
        this.container.classList.add('flexCenterColumn')

        const img = document.createElement('img');
        img.src = logo;
        img.id = 'logo'
        this.container.appendChild(img);

        const textWelcome = document.createElement('h1');
        textWelcome.id = 'welcome_text'
        textWelcome.innerText = 'Bonjour, bienvenue sur le meilleur quizz de football qui utilise WebPack !'
        this.container.appendChild(textWelcome);

        const textRules = document.createElement('h1');
        textRules.id = 'rules_text'
        textRules.innerText = `Les règles sont simples, vous aurez une série de questions, portant sur le gagnant d'un championnat sélectionné au hasard, lors d'une saison également choisie au hasard. Vous obtiendrez votre score à la fin et un résumé de vos réponses.`;
        this.container.appendChild(textRules);

        const divStarting = document.createElement('div');
        divStarting.id = 'divStarting';
        divStarting.classList.add('flexCenterRow');
        this.container.appendChild(divStarting)

        const buttonStart = document.createElement('button');
        buttonStart.id = 'button_start'
        buttonStart.textContent = 'Démarrer'
        divStarting.appendChild(buttonStart);

        const selectNumber = document.createElement('select');
        selectNumber.id = 'selectNumber';
        divStarting.appendChild(selectNumber);

        const options = [
            { value: 1, text: '1 question' },
            { value: 2, text: '2 questions' },
            { value: 3, text: '3 questions' },
            { value: 4, text: '4 questions' }
        ];

        options.forEach(optionData => {
            const option = document.createElement('option');
            option.value = optionData.value;
            option.text = optionData.text;
            selectNumber.appendChild(option);
        });

        selectNumber.value = global.numberOfQuestions;

        selectNumber.addEventListener('change', function () {
            global.numberOfQuestions = selectNumber.value;
        });

        buttonStart.addEventListener('click', () => {
            window.router.navigateTo('QuizzPage');
        });
    }

    async closePage() {
        if (this.container) {
            this.root.removeChild(this.container);
        }
    }

}