import { div } from '../utils/element';
import { appendArray } from '../utils/handleElement';
import BarGraph from '../component/graph/barGraph.js';
import PieChart from '../component/graph/pieChart.js';

import './chartApp.scss';

export default class ChartComponent {
    constructor() {
        this.baseElement = div();

        this.piechart = new PieChart();
        this.barGraph = new BarGraph();
        this.lineGraph = null;  // TODO : 추후 구현
    }
    setData(data) {
        this.piechart.setData(data);
        this.barGraph.setData(data);
    }
    createElement() {
        appendArray(this.baseElement,
            [this.piechart.render(), this.barGraph.render()]);
    }
    reset() {
        this.baseElement.innerHTML = '';
    }
    render(monthModel) {
        this.reset();
        this.setData(monthModel);
        this.createElement();
        return this.baseElement;
    }
}