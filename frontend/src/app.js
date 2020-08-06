import './app.scss';
import Router from './router';
import Model from './model';

import { Header } from './component/header/header';
import { Body } from './component/body/body';
import { ListTab, MonthTab } from './component/body/tap/tab';

import HistoryComponent from './app/app';
import CalenderComponent from './calender/calenderApp';
import ChartComponent from './chartApp/chartApp';

const DATA = [
    { name: '생활', percent: '70%', money: 315000 },
    { name: '식비', percent: '16%', money: 72000 },
    { name: '교통', percent: '4%', money: 18000 },
    { name: '쇼핑/뷰티', percent: '4%', money: 18000 },
    { name: '의료/건강', percent: '2%', money: 9000 },
    { name: '문화/여가', percent: '2%', money: 9000 },
    { name: '미분류', percent: '2%', money: 9000 },
];

// 모델 생성
const model = new Model();
window.model = model;

// 라우터 생성
const app = document.querySelector('#app'); // 최상단 노드
const router = new Router(app, model);
window.router = router;



// 전역 헤더, 탭 생성
const header = new Header();
const listTab = new ListTab(router);
const monthTab = new MonthTab(router);


// 바디세팅
const bodyComponent = new Body(header, listTab, monthTab);
router.setBody(bodyComponent);

// 컴포넌트들 생성
const historyComponent = new HistoryComponent();
const calenderComponent = new CalenderComponent();
const chartComponent = new ChartComponent();
// chartComponent.setData(DATA);

// 첫화면 설정
router.setPath('/', historyComponent);

// 그 외 경로 설정
router.setPath('/history', historyComponent);
router.setPath('/calender', calenderComponent);
router.setPath('/chart', chartComponent);

// 첫화면 고!
router.go('/');
