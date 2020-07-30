import { HeaderSection } from './component/header/header';
import { ListTap, MonthTap } from './component/tap/tap';
import BarGraph from './component/graph/barGraph.js';

const headerSection = new HeaderSection();
const monthTap = new MonthTap();
const listTap = new ListTap();

const app = document.querySelector('#app'); // 최상단 노드
headerSection.createHeader();
app.appendChild(headerSection.render());

monthTap.createMonthTapNodes();
app.appendChild(monthTap.render());

listTap.createListTap();
app.appendChild(listTap.render());

