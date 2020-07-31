import './tap.scss';
import { createEl } from '../../utils/createElement';
import { createChildren } from '../../utils/createChildren';
import { clickHistory, clickCalender, clickStatistics } from './tapHandler';


export class ListTap {
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
        this.listTapHistoryWrap = createEl('div', 'list-tap-history-wrap', '', { onclick: clickHistory });
        this.listTapHistory = createEl('div', 'list-tap-history', '내역', {});
        // this.listTapContour = createEl('div','list-tap-contour', '|', {});
        this.listTapCalenderWrap = createEl('div', 'list-tap-calender-wrap', '', { onclick: clickCalender });
        this.listTapCalender = createEl('div', 'list-tap-calender', '달력', {});
        this.listTapStatisticsWrap = createEl('div', 'list-tap-statistics-wrap', '', { onclick: clickStatistics });
        this.listTapStatistics = createEl('div', 'list-tap-statistics', '통계', {});

        createChildren(this.listTapWrap, this.listTapHistoryWrap, this.listTapCalenderWrap, this.listTapStatisticsWrap);
        createChildren(this.listTapHistoryWrap, this.listTapHistory);
        createChildren(this.listTapCalenderWrap, this.listTapCalender);
        createChildren(this.listTapStatisticsWrap, this.listTapStatistics);
        createChildren(this.listTapSection, this.listTapWrap);
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createListTap();

        return this.listTapSection;
    }
}

export class MonthTap {
    constructor() {
        this.monthTapSection = createEl('div', 'month-tap-section', '', {});

    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.monthTapSection.innerHTML = '';
    }

    createMonthTapNodes() {
        this.monthTapWrap = createEl('div', 'month-tap-wrap', '', {});
        this.leftArrow = createEl('div', 'left-arrow', '⇦', {});
        this.selectedMonth = createEl('div', 'selected-month', '6월', {});
        this.rightArrow = createEl('div', 'right-arrow', '⇨', {});

        createChildren(this.monthTapWrap, this.leftArrow, this.selectedMonth, this.rightArrow);
        createChildren(this.monthTapSection, this.monthTapWrap);
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createMonthTapNodes();

        return this.monthTapSection;
    }
}


