

export default class Router {
    constructor(appElement, model) {
        this.model = model;
        this.appElement = appElement;
        this.viewMap = new Map;
        this.bodyComponent = null;
        this.popStateHandler = this.popStateHandler.bind(this);
        window.addEventListener('popstate', this.popStateHandler);
    }
    setPath(path, component) {
        this.viewMap.set(path, component);
    }
    setBody(component) {
        this.bodyComponent = component;
    }
    getPathComponent(path) {
        return this.viewMap.get(path);
    }
    go(path, state) {
        this.pushState(path, state);
        this.popStateHandler({ state })
    }
    getState() {

    }
    pushState(path, state) {
        history.pushState(state, '', path);
    }
    async popStateHandler({ state }) {
        const monthData = await this.model.getMonthData();
        const targetView = location.pathname;
        const viewComponent = this.viewMap.get(targetView);
        this.model.subscribe(viewComponent);
        this.bodyComponent.setMutableComponents(viewComponent);
        app.innerHTML = "";
        app.appendChild(this.bodyComponent.render(monthData));
    }
}