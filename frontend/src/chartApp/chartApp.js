import { HeaderSection } from '../component/header/header';
import { ListTap, MonthTap } from '../component/tap/tap';
import BarGraph from '../component/graph/barGraph.js';
import PieChart from '../component/graph/pieChart.js';

const DATA = [
    { name: "생활", percent: "70%", money: 315000 },
    { name: "식비", percent: "16%", money: 72000 },
    { name: "교통", percent: "4%", money: 18000 },
    { name: "쇼핑/뷰티", percent: "4%", money: 18000 },
    { name: "의료/건강", percent: "2%", money: 9000 },
    { name: "문화/여가", percent: "2%", money: 9000 },
    { name: "미분류", percent: "2%", money: 9000 },
];

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



const barGraph = new BarGraph(DATA);
app.appendChild(barGraph.render());

app.appendChild(PieChart(DATA));
