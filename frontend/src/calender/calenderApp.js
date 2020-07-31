import { Header } from '../component/header/header';
import { Body } from '../component/body/body';
import { ListTab, MonthTab } from '../component/body/tap/tab';

import './calenderApp.scss';

const app = document.querySelector('#app'); // 최상단 노드
const headerSection = new Header();
const bodySection = new Body(new MonthTab, new ListTab);


app.appendChild(headerSection.render());

app.appendChild(bodySection.render());

const div = document.createElement('div');
div.className = "ready";
div.innerText = "준비중입니다.";
app.appendChild(div);