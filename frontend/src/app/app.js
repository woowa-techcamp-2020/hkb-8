import { Header } from '../component/header/header';
import { Body } from '../component/body/body';
import './app.scss';
import { ListTab, MonthTab } from '../component/body/tap/tab';
import { Input } from '../component/body/input/input';

const app = document.querySelector('#app'); // 최상단 노드
const headerSection = new Header();
const bodySection = new Body(new MonthTab, new ListTab, new Input);

headerSection.createHeader();
app.appendChild(headerSection.render());

bodySection.createBody();
app.appendChild(bodySection.render());


