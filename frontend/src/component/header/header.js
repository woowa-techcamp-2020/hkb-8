import './header.scss';
import { createEl } from '../../utils/createElement';
import { appendChildren } from '../../utils/appendChildren';
import { clickPaymentManageBtn } from './headerHandler';


export class Header {
    constructor() {
        this.headerSection = createEl('header','header-section', '', {});

    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.headerSection.innerHTML ='';
    }

    createHeader() {
        this.headerLeft = createEl('div','header-left', '', {});
        this.headerMiddle = createEl('div','header-middle', '우 아 한 가 계 부', {});
        this.headerRight = createEl('div','header-right', '결제 수단 관리', {onclick:clickPaymentManageBtn});

        appendChildren(this.headerSection, this.headerLeft, this.headerMiddle, this.headerRight);
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createHeader();

        return this.headerSection;
    }
}

