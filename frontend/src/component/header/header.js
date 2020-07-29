import './header.scss';
import '../../utils/createElement';
import { createEl } from '../../utils/createElement';
import { createChildren } from '../../utils/createChildren';

class HeaderSection {
    constructor() {
        this.headerSection = createEl('header','header-section', '', {});

    }
    setData(data) {
        this.data = data;
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createHeader();

        return this.headerSection;
    }

    reset() {
        this.headerSection.innerHTML ='';
    }

    createHeader() {
        this.headerLeft = createEl('div','header-left', '', {});
        this.headerMiddle = createEl('div','header-middle', '우 아 한 가 계 부', {});
        this.headerRight = createEl('div','header-right', '결제 수단 관리', {});

        createChildren(this.headerSection, this.headerLeft, this.headerMiddle, this.headerRight);
    }
}


export const header = new HeaderSection();