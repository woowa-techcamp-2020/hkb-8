

export default class Router {
    constructor(appElement) {
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
    popStateHandler({ state }) {
        const targetView = location.pathname;
        const viewComponent = this.viewMap.get(targetView);
        this.bodyComponent.setMutableComponents(viewComponent);
        app.innerHTML = "";
        app.appendChild(this.bodyComponent.render());
    }
}