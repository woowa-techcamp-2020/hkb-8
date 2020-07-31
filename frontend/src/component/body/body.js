import { createEl } from '../../utils/createElement';
import { appendChildren } from '../../utils/appendChildren';
import './body.scss';


export class Body {
    constructor(...components) {
        this.bodySection = createEl('div', 'body-section', '', {});
        this.components = components.map(o => o);
    }

    setData(data) {
        this.data = data;
    }

    reset() {
        this.bodySection.innerHTML = '';
    }

    createBody() {
        appendChildren(this.bodySection, ...this.components.map(component => component.render()));
    }

    render() {
        this.reset();
        this.createBody();

        return this.bodySection;
    }
}

