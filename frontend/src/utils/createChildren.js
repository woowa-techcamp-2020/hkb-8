export const createChildren = function (parentElement, ...children) {
    children.forEach(child => {
        parentElement.appendChild(child);
    });
};