import { Header } from './component/header/header';
import { Body } from './component/body/body';
import './app.scss';
import { ListTab, MonthTab } from './component/body/tap/tab';
import { Input } from './component/body/input/input';

const app = document.querySelector('#app'); // 최상단 노드
const headerSection = new Header();
headerSection.createHeader();

const recordSection = new Body(new MonthTab, new ListTab, new Input);
recordSection.createBody();

app.appendChild(headerSection.render());
app.appendChild(recordSection.render());

