export const createEl = function(tagType, className, text, attrObj) {

    const elementNode = document.createElement(tagType,);
    elementNode.setAttribute('class', className);

    if(text.trim().length > 0) {
        const textNode = document.createTextNode(text);
        elementNode.appendChild(textNode);
    }

    Object.entries(attrObj).forEach(([key, value]) => {
        console.log(key, value);
        if(key === 'style') {
            console.log(value);
            elementNode.style.cssText = value;
        } else {
            elementNode.setAttribute(key, value);
        }
    });
    return elementNode;
};


