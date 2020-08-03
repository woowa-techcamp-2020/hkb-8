import { createEl } from '../../utils/createElement';
import { appendArray } from '../../utils/handleElement'
import './body.scss';


export class Body {
    constructor(...commonComponents) {
        this.bodySection = createEl('div', 'body-section', '', {});
        this.commonComponents = commonComponents.map(o => o);
        this.mutableComponents = [];
    }

    setData(data) {
        this.data = data;
    }

    reset() {
        this.bodySection.innerHTML = '';
    }
    setMutableComponents(...components) {
        this.mutableComponents = components;
    }

    createBody() {
        const commons = this.commonComponents.map(component => component.render());
        const mutable = this.mutableComponents.map(component => component.render());
        appendArray(this.bodySection, [...commons, ...mutable]);
    }

    render() {
        this.reset();
        this.createBody();

        return this.bodySection;
    }
}

