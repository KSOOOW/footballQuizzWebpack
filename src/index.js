import './styles/global.css';
import Router from './router';

document.addEventListener('DOMContentLoaded', async () => {

    global.numberOfQuestions = 4;

    const router = new Router();
    window.router = router;
    router.init();
    

});