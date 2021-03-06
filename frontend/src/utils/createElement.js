export const createEl = function (tagType, className, text, attrObj) {

    const elementNode = document.createElement(tagType,);
    elementNode.setAttribute('class', className);

    if (text.trim().length > 0) {
        const textNode = document.createTextNode(text);
        elementNode.appendChild(textNode);
    }

    Object.entries(attrObj).forEach(([key, value]) => {
        if (key === 'style') {
            elementNode.style.cssText = value;
        } else {
            elementNode[key] = value;
        }
    });
    return elementNode;
};


