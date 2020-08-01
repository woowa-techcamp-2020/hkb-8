import { Header } from '../component/header/header';
import { Body } from '../component/body/body';
import { ListTab, MonthTab } from '../component/body/tap/tab';

import './calenderApp.scss';


class Calender {
    constructor() {
        const div = document.createElement('div');
        div.className = "ready";
        div.innerText = "준비중입니다.";
        this.element = div;
    }
    render() {
        return this.element;
    }
}

const headerSection = new Header();
const bodySection = new Body(new Header, new MonthTab, new ListTab, new Calender);

export default bodySection;