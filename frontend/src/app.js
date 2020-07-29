import { HeaderSection } from './component/header/header';

const headerSection = new HeaderSection();

// document.addEventListener('DOMContentLoaded', () => {
//     const targetEl = document.querySelector('#app',);
//     header.createHeader();
//     targetEl.appendChild(header.render());
// });

const targetEl = document.querySelector('#app'); // 최상단 노드
headerSection.createHeader();
targetEl.appendChild(headerSection.render());

