
import './app.scss';
import { div } from '../utils/element';
import { appendArray } from '../utils/handleElement';
import { Input } from '../component/body/input/input';
import { History } from '../component/history/history';
import { TotalInOutcome } from '../component/totalInOutcome/TotalInOutcome';


export default class HistoryComponent {
    constructor() {
        this.baseElement = div();
        this.inputComponent = new Input(this);
        this.historyComponent = new History(this);
        this.totalInOutcome = new TotalInOutcome();
    }
    createElement(monthModel) {
        appendArray(this.baseElement, [
            this.inputComponent.render(monthModel),
            this.totalInOutcome.render(monthModel),
            this.historyComponent.render(monthModel)
        ]);
    }
    setDataToInput(data) {
        this.inputComponent.setDataToInputElement(data);
    }
    reset() {
        this.baseElement.innerHTML = '';
    }
    render(monthModel) {
        this.reset();
        this.createElement(monthModel);
        return this.baseElement;
    }
}