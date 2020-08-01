import './app.scss';
import chartApp from './chartApp/chartApp'
import historyApp from './app/app';
import calenderApp from './calender/calenderApp';

const app = document.querySelector('#app'); // 최상단 노드
app.appendChild(historyApp.render());

const viewMap = new Map;
viewMap.set('/', historyApp);
viewMap.set('/chart', chartApp);
viewMap.set('/calender', calenderApp);


function popStateHandler({ state }) {
    console.log(state);
    const targetView = location.pathname;
    const viewComponent = viewMap.get(targetView);
    app.innerHTML = "";
    app.appendChild(viewComponent.render());
}
window.popStateHandler = popStateHandler;

function onRouter() {
    window.addEventListener("popstate", popStateHandler);
}

onRouter();