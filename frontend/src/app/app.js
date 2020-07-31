import { Header } from '../component/header/header';
import { Body } from '../component/body/body';
import './app.scss';

const app = document.querySelector('#app'); // 최상단 노드
const headerSection = new Header();
const bodySection = new Body();

// headerSection.createHeader();
app.appendChild(headerSection.render());

// bodySection.createBody();
app.appendChild(bodySection.render());

