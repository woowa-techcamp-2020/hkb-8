export const appendChildren = function (parentElement, ...children) {
    children.forEach(child => {
        parentElement.appendChild(child);
    });

    return parentElement;
};