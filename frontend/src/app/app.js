
import './app.scss';
import { div } from '../utils/element';
import { appendArray } from '../utils/handleElement';
import { Input } from '../component/body/input/input';
import { History } from "../component/history/history";



export default class HistoryComponent {
    constructor() {
        this.baseElement = div();
        this.inputComponent = new Input();
        this.historyComponent = new History();
    }
    createElement() {
        appendArray(this.baseElement, [
            this.inputComponent.render(),
            this.historyComponent.render()
        ]);
    }
    reset() {
        this.baseElement.innerHTML = "";
    }
    render() {
        this.reset();
        this.createElement();
        return this.baseElement;
    }
}