import { createEl } from '../../utils/createElement';
import { appendChildren } from '../../utils/appendChildren';
import { ListTab, MonthTab } from './tap/tab';
import { Input } from './input/input';
import './body.scss';


export class Body {
    constructor() {
        this.bodySection = createEl('div','body-section', '', {});
        this.monthTab = new MonthTab();
        this.listTab = new ListTab();
        this.input = new Input();
    }

    setData(data) {
        this.data = data;
    }

    reset() {
        this.bodySection.innerHTML ='';
    }

    createBody() {
        appendChildren(this.bodySection, this.monthTab.render(), this.listTab.render(), this.input.render());
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createBody();

        return this.bodySection;
    }
}

