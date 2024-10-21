export default class Router {

    constructor() {
        this.pages = {
            WelcomePage: () => import("./pages/WelcomePage").then((m) => new m.default()),
            QuizzPage: () => import("./pages/QuizzPage").then((m) => new m.default()),
        };
    }
    
    init() {
        window.addEventListener("popstate", this.handlePopState.bind(this));
        this.navigateTo(this.getCurrentPage());
    }

    getCurrentPage() {
        return window.location.hash.slice(1) || "WelcomePage";
    }

    async navigateTo(pageName) {
        console.log(`Navigating to ${pageName}`);

        if (!this.pages[pageName]) {
            console.error(`Page "${pageName}" not found`);
            return;
        }

        history.pushState(null, "", `#${pageName}`);

        await this.renderPage(pageName);
    }

    handlePopState() {
        this.renderPage(this.getCurrentPage());
    }

    async renderPage(pageName) {
        const pageLoader = this.pages[pageName];

        if (pageLoader) {
            if (this.currentPage) {
                await this.currentPage.closePage();
            }

            this.currentPage = await pageLoader();
            this.currentPage.display();
        } else {
            console.error(`Page "${pageName}" not found`);
        }
    }
}