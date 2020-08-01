import { Header } from '../component/header/header';
import { Body } from '../component/body/body';
import './app.scss';
import { ListTab, MonthTab } from '../component/body/tap/tab';
import { Input } from '../component/body/input/input';

const app = document.querySelector('#app'); // 최상단 노드
const headerSection = new Header();
headerSection.createHeader();
const bodySection = new Body(headerSection, new MonthTab, new ListTab, new Input);
bodySection.createBody();

export default bodySection;
