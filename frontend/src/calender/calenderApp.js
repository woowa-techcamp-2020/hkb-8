import { Header } from '../component/header/header';
import { Body } from '../component/body/body';
import { ListTab, MonthTab } from '../component/body/tap/tab';
import { Calender } from "../component/calender/calender";
import './calenderApp.scss';

const model = { currentMonth: 8 };
window.model = model;


const bodySection = new Body(new Header, new MonthTab, new ListTab, new Calender(new Date()));


export default bodySection;