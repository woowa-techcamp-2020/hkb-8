export const createEl = function(tagType, text, name, attrObj,) {
    const elementNode = document.createElement(tagType,);
    const textNode = document.createTextNode(text,);
    elementNode.appendChild(textNode,);
    elementNode.setAttribute('className', name);

    // if(Object.keys(attrObj).length > 0) {
    //     for (const [key, value] of Object.entries(attrObj,)) {
    //         elementNode.setAttribute(key, value);
    //         console.log(key, value);
    //     }
    // }

    // Object.entries(attrObj).forEach((val) => {
    //     elementNode.setAttribute(val[0], val[1]);
    //     // console.log(val[0], val[1]);
    // });


    // for(let n in attrObj){
    //     elementNode.setAttribute(n, attrObj[n]);
    // 	    // console.log(n, attrObj[n]);
    // }


    return elementNode;
};
