import { Header } from '../component/header/header';
import { Body } from '../component/body/body';
import { ListTab, MonthTab } from '../component/body/tap/tab';
import { Calender } from "../component/calender/calender";
import './calenderApp.scss';

const app = document.querySelector('#app'); // 최상단 노드
const headerSection = new Header();
const bodySection = new Body(new MonthTab, new ListTab, new Calender);


app.appendChild(headerSection.render());
app.appendChild(bodySection.render());

