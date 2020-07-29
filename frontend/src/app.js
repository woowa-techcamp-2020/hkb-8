import { header } from './component/header/header';

document.addEventListener('DOMContentLoaded', () => {
    const targetEl = document.querySelector('#app',);
    header.createHeader();
    targetEl.appendChild(header.render());
});

