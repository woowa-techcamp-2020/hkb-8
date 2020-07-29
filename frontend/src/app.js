import { HeaderSection } from './component/header/header';
import { ListTap, MonthTap } from './component/tap/tap';

const headerSection = new HeaderSection();
const monthTap = new MonthTap();
const listTap = new ListTap();

// document.addEventListener('DOMContentLoaded', () => {
//     const targetEl = document.querySelector('#app',);
//     header.createHeader();
//     targetEl.appendChild(header.render());
// });

const app = document.querySelector('#app'); // 최상단 노드
headerSection.createHeader();
app.appendChild(headerSection.render());

monthTap.createMonthTapNodes();
app.appendChild(monthTap.render());

listTap.createListTap();
app.appendChild(listTap.render());

