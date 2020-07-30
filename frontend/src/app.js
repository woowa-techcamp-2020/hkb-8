import * as math from './math.js'
import { sum } from './math.js'
import './app.scss';
import BarGraph from './component/graph/barGraph.js';
// import bori from './bori.jpg';
//
// document.addEventListener('DOMContentLoaded', () => {
// 	document.body.innerHTML = `
// 	<img src=${bori} />
// `
// })

const DATA = [
    { name: "생활", percentage: "71%", money: 315000 },
    { name: "식비", percentage: "16%", money: 72000 },
    { name: "교통", percentage: "4%", money: 18000 },
    { name: "쇼핑/뷰티", percentage: "4%", money: 18000 },
    { name: "의료/건강", percentage: "2%", money: 9000 },
    { name: "문화/여가", percentage: "2%", money: 9000 },
    { name: "미분류", percentage: "2%", money: 9000 },
];


console.log(math.sum(1, 3));
console.log(sum(6, 3))
console.log(sum(2, 1))
console.log();
(function () { })()

const barGraphArea = document.querySelector('#bargraph');
const barGraph = new BarGraph(barGraphArea, DATA);
barGraph.render();
console.log(barGraphArea, 111, barGraph);