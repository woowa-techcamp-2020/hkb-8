import SVG from "./svgUtil";
import { span, hr, div } from "../../utils/element.js";
import { appendArray } from '../../utils/handleElement';
const { svg, circle, animate, createNS, defs, filter, feOffset, feGaussianBlur, feBlend } = SVG;

const COLORS = [
    "#c1e7ff", "#a3cbe5", "#86b0cc",
    "#6996b3", "#4c7c9b", "#2d6484", "#004c6d",
].reverse();


// 100% => 100.58로 변경한다.
// stroke-width가 20이기 때문에 아래의 20이 나왔다.
function pieValue(percent) {
    return `${parseInt(percent) * 1.0058 / 32 * 20}`;
}
function getAngle(percent) {
    return percent / 100 * 360 - 90;
}
function getXYPosition(angle, radius) {
    const r = radian(angle);
    let [x, y] = getXY(r, radius);
    return [x, y];
}
function radian(angle) {
    return angle * Math.PI / 180;
}
function getXY(radian, radius) {
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return [x, y];
}

const className = 'piechart';

export default class Chart {
    constructor() {
        this.data = null;
        this.areaElement = div({ className });
    }
    setData(data) {
        this.data = data.concat().reverse();
    }
    makeSvgElement() {
        if (this.data === null) throw "data가 설정되지 않습니다.";
        const segmentations = this.makeSegmentation();
        // segmentations[0].setAttribute('filter', 'url(#f1)');    // 필터, (하지만 그다지 안 이쁨..)
        const svgElement =
            svg(
                {
                    viewBox: "0 0 50 50",
                    style: `border-radius:50%; transform:rotate(-90deg); background:#fff; `,
                },
                defs({},
                    filter({ id: "f1", x: -1, y: -1, width: '300%', height: '300%' },
                        feOffset({ result: 'offOut', in: 'SourceGraphic', dx: -1, dy: 0 }),
                        feGaussianBlur({ result: 'blurout', in: 'offOut', stdDeviation: 1 }),
                        feBlend({ in: 'SourceGraphic', in2: 'blurOut', mode: 'normal' })
                    )
                ),
                ...segmentations
            );

        const textElements = this.makeTextAndLine();
        segmentations.forEach((one, idx) => {
            one.addEventListener('mouseover', e => {
                textElements[idx * 2 + 1].classList.toggle('hidden');
                textElements[idx * 2].classList.toggle('hidden');
            });
            one.addEventListener('mouseout', e => {
                textElements[idx * 2 + 1].classList.toggle('hidden');
                textElements[idx * 2].classList.toggle('hidden');
            });
        });
        appendArray(this.areaElement, [svgElement, ...textElements]);
    }
    /**
     * 0시, 0도를 기준으로 360도에 가장 근접할수록 가장 먼저 그려져야 된다.
     * 가장 나중에 그려지는 조각이 가장 zindex가 앞에 있는것과 비슷한 효과를 가진다.
     */
    makeSegmentation() {
        let value = 100;
        const textElements = this.makeTextAndLine();
        const data = this.data;
        const result = [];

        data.forEach((one, idx) => {

            const ciecleElement = circle(
                {
                    class: "one-pie",
                    "stroke-dasharray": `${pieValue(value)} 100`,
                    fill: "none",
                    "stroke-width": "20",
                    r: 10, cx: 25, cy: 25,
                    stroke: COLORS[idx]
                },
                animate({
                    attributeName: "stroke-dashoffset",
                    from: pieValue(value),
                    to: 0,
                    dur: `${value * 0.005}s`,
                    fill: "freeze"
                })
            );

            result.push(ciecleElement);
            value -= parseInt(one.percent);
        });
        return result;
    }
    makeTextAndLine() {
        let value = 100;
        const data = this.data;
        const result = [];
        data.forEach(d => {

            // d.percent는 0%~100%까지의 문자열이다. 추후 소숫점으로 변경시 꼭 잊이말아야 한다!
            const middleValue = (2 * (value) - parseInt(d.percent)) / 2;
            const angle = getAngle(middleValue);
            let [x, y] = getXYPosition(angle, 230);

            // 200 : 파이그래프 전체 너비 400의 절반
            // 50, 15 : 각각 문자열 span의 너비와 높이의 절반값 이다.
            x += 200 - 50;
            y += 200 - 15;

            const s = span(
                { className: "piechart-text hidden", style: { left: `${x}px`, top: `${y}px` } },
                d.name + " " + d.percent
            );

            [x, y] = getXYPosition(angle, 160);
            x += 200;
            y += 200 - 8;   // 8은 텍스트에 대한 라인을 조정하는 매직넘버이다. 

            // 텍스트에 접하는 선을 만든다.
            const h = hr({
                className: "piechart-text-line hidden",
                style: {
                    left: `${x}px`, top: `${y}px`,
                    transform: `rotate(${angle}deg)`,
                }
            })
            result.push(s, h);
            value -= parseInt(d.percent);
        });
        return result;
    }
    render() {
        this.makeSvgElement();
        return this.areaElement;
    }
}