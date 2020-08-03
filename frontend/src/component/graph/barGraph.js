import SVG from "./svgUtil";


const { svg, rect, text, line, createNS } = SVG;

const COLORS = [
    "#c1e7ff", "#a3cbe5", "#86b0cc",
    "#6996b3", "#4c7c9b", "#2d6484", "#004c6d",
];

const TOP_MARGIN = 10;
const MARGIN = 3;
const LEFT_MARGIN = `${MARGIN}%`;
const RIGHT_MARGIN = `${100 - MARGIN}%`;
const ONE_HEIGHT = 25;
const RECT_RATIO = 0.5;
const ANIMATION_TIME = "0.5s";

// 상하 라인
const OUTER_STROKE_COLOR = "#6996b3";
const OUTER_STROKE_WIDTH = 2;

// 사이의 라인
const INNER_STROKE_COLOR = "#a3cbe5";
const INNER_STROKE_WIDTH = 1;

export default class BarGraph {
    constructor() {
        this.elementArea = document.createElement('div');
        this.elementArea.className = "bargraph";
        this.data = null;
    }
    setData(data) {
        this.data = data;
    }
    render() {
        // 일단은 elementArea의 style height를 수동으로 잡았지만 추후 변경
        this.resetElementArea();
        this.elementArea.style.height = this.data.length * (ONE_HEIGHT + TOP_MARGIN * 2) + OUTER_STROKE_WIDTH * 2 + "px";
        this.elementArea.appendChild(this.renderGraph());
        return this.elementArea;
    }
    resetElementArea() {
        this.elementArea.innerHTML = "";
    }
    renderGraph() {

        return svg(
            { width: "100%", height: "100%" },
            line({
                x1: 0, x2: "100%",
                y1: 1, y2: 1,
                stroke: OUTER_STROKE_COLOR,
                "stroke-width": OUTER_STROKE_WIDTH,
            }),
            ...this.data.map((d, idx, arr) => this.renderOneBar(d, idx)),
            line({
                x1: 0, x2: "100%",
                y1: this.data.length * (ONE_HEIGHT + TOP_MARGIN * 2) + OUTER_STROKE_WIDTH * 1.5, y2: this.data.length * (ONE_HEIGHT + TOP_MARGIN * 2) + OUTER_STROKE_WIDTH * 1.5,
                stroke: OUTER_STROKE_COLOR,
                "stroke-width": OUTER_STROKE_WIDTH,
            })
        );
    }
    renderOneBar(obj, idx) {
        return svg(
            {
                class: "one_area",
                y: TOP_MARGIN * (idx * 2 + 1) + ONE_HEIGHT * idx + OUTER_STROKE_WIDTH,
            },
            text(
                {
                    "alignment-baseline": "central",
                    x: LEFT_MARGIN,
                    y: ONE_HEIGHT / 2
                },
                obj.name
            ),
            text(
                {
                    "alignment-baseline": "central",
                    x: "18%",
                    y: ONE_HEIGHT / 2
                },
                obj.percent
            ),
            rect(
                {
                    height: ONE_HEIGHT,
                    x: "30%",
                    y: 0, fill: COLORS[idx]
                },
                createNS("animate", {
                    attributeName: "width",
                    from: 0,
                    to: parseInt(obj.percent) * RECT_RATIO + "%",
                    dur: ANIMATION_TIME,
                    fill: "freeze",
                })
            ),
            text(
                {
                    "alignment-baseline": "central",
                    x: RIGHT_MARGIN,
                    y: ONE_HEIGHT / 2, "text-anchor": "end",
                },
                obj.money + "원"
            ),
            line({
                x1: 0, x2: "100%",
                y1: ONE_HEIGHT + TOP_MARGIN, y2: ONE_HEIGHT + TOP_MARGIN,
                stroke: INNER_STROKE_COLOR,
                "stroke-width": INNER_STROKE_WIDTH,
            })
        );
    }
}

