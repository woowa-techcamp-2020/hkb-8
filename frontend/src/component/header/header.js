import './header.scss';
import { createEl } from '../../utils/createElement';
import { appendArray } from '../../utils/handleElement';
import { clickPaymentManageBtn } from './headerHandler';


export class Header {
    constructor(router) {
        this.headerSection = createEl('header', 'header-section', '', {});
        this.router = router;

    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.headerSection.innerHTML = '';
    }

    createHeader() {
        this.headerLeft = createEl('div', 'header-left', '', {});
        this.headerMiddle = createEl('div', 'header-middle', '우 아 한 가 계 부', {});
        this.headerRight = createEl('div', 'header-right', '결제 수단 관리', { onclick: clickPaymentManageBtn });

        appendArray(this.headerSection, [this.headerLeft, this.headerMiddle, this.headerRight]);
    }

    render() {
        this.reset();
        this.createHeader();

        return this.headerSection;
    }
}

