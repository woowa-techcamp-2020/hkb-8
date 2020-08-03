import './tab.scss';
import { createEl } from '../../../utils/createElement';
import { appendChildren } from '../../../utils/appendChildren';
import { clickHistory, clickCalender, clickStatistics, clickLeftArrow, clickRightArrow } from './tabHandler';
import { Calender } from "../../calender/calender";

export class ListTab {
    constructor() {
        this.listTapSection = createEl('div', 'list-tap-section', '', {});

    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.listTapSection.innerHTML = '';
    }

    createListTap() {
        this.listTapWrap = createEl('div', 'list-tap-wrap', '', {});
        this.listTapHistoryWrap = createEl('div', 'list-tap-history-wrap list', '', { onclick: clickHistory });
        this.listTapHistory = createEl('div', 'list-tap-history', '내역', {});
        // this.listTapContour = createEl('div','list-tap-contour', '|', {});
        this.listTapCalenderWrap = createEl('div', 'list-tap-calender-wrap list', '', { onclick: clickCalender });
        this.listTapCalender = createEl('div', 'list-tap-calender', '달력', {});
        this.listTapStatisticsWrap = createEl('div', 'list-tap-statistics-wrap list', '', { onclick: clickStatistics });
        this.listTapStatistics = createEl('div', 'list-tap-statistics', '통계', {});

        appendChildren(this.listTapWrap, this.listTapHistoryWrap, this.listTapCalenderWrap, this.listTapStatisticsWrap);
        appendChildren(this.listTapHistoryWrap, this.listTapHistory);
        appendChildren(this.listTapCalenderWrap, this.listTapCalender);
        appendChildren(this.listTapStatisticsWrap, this.listTapStatistics);
        appendChildren(this.listTapSection, this.listTapWrap);
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createListTap();

        return this.listTapSection;
    }
}

export class MonthTab {
    constructor() {
        this.monthTapSection = createEl('div', 'month-tap-section', '', {});
        this.currentMonth = new Date().getMonth() + 1;

    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.monthTapSection.innerHTML = '';
    }

    createMonthTapNodes() {
        this.monthTapWrap = createEl('div', 'month-tap-wrap', '', {});
        this.leftArrow = createEl('div', 'left-arrow prev', '⇦', { onclick: clickLeftArrow });
        this.selectedMonth = createEl('div', 'selected-month date', `${this.currentMonth}`, {});

        this.rightArrow = createEl('div', 'right-arrow next', '⇨', { onclick: clickRightArrow });

        appendChildren(this.monthTapWrap, this.leftArrow, this.selectedMonth, this.rightArrow);
        appendChildren(this.monthTapSection, this.monthTapWrap);

        this.leftArrow.addEventListener("click", () => {
            const calendarComponent = window.viewMap.get('/calender').components.find(one => one instanceof Calender);
            calendarComponent.moveMonth(-1);
            calendarComponent.renderCalendar();
            this.currentMonth--;
            this.render();
        });

        this.rightArrow.addEventListener("click", () => {
            const calendarComponent = window.viewMap.get('/calender').components.find(one => one instanceof Calender);
            calendarComponent.moveMonth(1);
            calendarComponent.renderCalendar();
            this.currentMonth++;
            this.render();
        });
    }

    render() {
        this.reset();
        this.createMonthTapNodes();

        return this.monthTapSection;
    }
}


