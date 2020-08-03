import { Header } from '../component/header/header';
import { Body } from '../component/body/body';
import { ListTab, MonthTab } from '../component/body/tap/tab';
import BarGraph from '../component/graph/barGraph.js';
// import PieChart from '../component/graph/pieChart.js';
import PieChart from '../component/graph/pieChart.js';

import './chartApp.scss';

const DATA = [
    { name: "생활", percent: "70%", money: 315000 },
    { name: "식비", percent: "16%", money: 72000 },
    { name: "교통", percent: "4%", money: 18000 },
    { name: "쇼핑/뷰티", percent: "4%", money: 18000 },
    { name: "의료/건강", percent: "2%", money: 9000 },
    { name: "문화/여가", percent: "2%", money: 9000 },
    { name: "미분류", percent: "2%", money: 9000 },
];


const headerSection = new Header();
const barGraph = new BarGraph(DATA);
const pieChart = new PieChart();
pieChart.setData(DATA);
const bodySection = new Body(headerSection, new MonthTab, new ListTab, pieChart, barGraph);

export default bodySection;