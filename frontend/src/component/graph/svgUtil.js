const SVG_URI = "http://www.w3.org/2000/svg";

const createNS = (type, attr, ...children) => {
    const element = document.createElementNS(SVG_URI, type);
    element.version = "1.1";

    for (const name in attr) {
        if (name === "textContent") {
            const textNode = document.createTextNode(attr[name]);
            element.appendChild(textNode);
        } else {
            element.setAttributeNS(null, name, attr[name]);
        }
    }
    children.forEach((child) => element.appendChild(child));
    return element;
};

export default {
    createNS,
    svg(attr, ...children) {
        const element = createNS("svg", attr, ...children);
        return element;
    },
    g(attr, ...children) {
        let gElement;
        return (gElement = createNS("g", attr, ...children));
    },
    line(attr) {
        return createNS("line", attr);
    },
    rect(attr, ...children) {
        return createNS("rect", attr, ...children);
    },
    text(attr, textContent) {
        return createNS("text", Object.assign(attr, { textContent }));
    },
    circle(attr, ...children) {
        return createNS('circle', attr, ...children);
    },
    animate(attr) {
        return createNS("animate", attr);
    },
};
