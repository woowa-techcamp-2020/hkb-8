import SVG from "./svgUtil";

const { svg, circle, rect, text, line, animate } = SVG;

const COLORS = [
    "#c1e7ff", "#a3cbe5", "#86b0cc",
    "#6996b3", "#4c7c9b", "#2d6484", "#004c6d",
].reverse();

export default function (data) {
    const areaElement = document.createElement('div');
    areaElement.className = "piechart";
    const svgElement = svg(
        {
            viewBox: "0 0 32 32",
            style: `
                border-radius:50%;
                transform:rotate(-90deg);
                background:#fff;`,
        },
        ...makePieces(data)
    );

    areaElement.appendChild(svgElement);
    return areaElement;
}

// 0시, 0도를 기준으로 360도에 가장 근접할수록 가장 먼저 그려져야 된다.
// 가장 나중에 그려지는 조각이 가장 zindex가 앞에 있는것과 비슷한 효과를 가진다.
function makePieces(data) {
    const copyData = data.concat().reverse();
    let value = 100;    // 누적해서 빼는 값

    const result = copyData.map((one, idx) => {
        const c =
            circle(
                {
                    "stroke-dasharray": `${pieValue(value)} 100`,
                    fill: "none",
                    "stroke-width": "32",
                    r: 16, cx: 16, cy: 16,
                    stroke: COLORS[idx]
                },
                animate({
                    attributeName: "stroke-dashoffset",
                    from: pieValue(value),
                    to: 0,
                    dur: `${value * 0.01}s`,
                    // dur: `1s`,
                    fill: "freeze"
                })
            );
        value -= parseInt(one.percent);
        return c;
    });
    return result;
}

// 100% => 100.58로 변경한다.
function pieValue(percent) {
    return `${parseInt(percent) * 1.0058}`;
}