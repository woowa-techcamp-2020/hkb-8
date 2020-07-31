import './tab.scss';
import { createEl } from '../../../utils/createElement';
import { appendChildren } from '../../../utils/appendChildren';
import { clickHistory, clickCalender, clickStatistics, clickLeftArrow, clickRightArrow } from './tabHandler';


export class ListTab {
    constructor() {
        this.listTapSection = createEl('div','list-tap-section', '', {});

    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.listTapSection.innerHTML ='';
    }

    createListTap() {
        this.listTapWrap = createEl('div','list-tap-wrap', '', {});
        this.listTapHistoryWrap = createEl('div','list-tap-history-wrap list', '', {onclick:clickHistory});
        this.listTapHistory = createEl('div','list-tap-history', '내역', {});
        // this.listTapContour = createEl('div','list-tap-contour', '|', {});
        this.listTapCalenderWrap = createEl('div','list-tap-calender-wrap list', '', {onclick:clickCalender});
        this.listTapCalender = createEl('div','list-tap-calender', '달력', {});
        this.listTapStatisticsWrap = createEl('div','list-tap-statistics-wrap list', '', {onclick:clickStatistics});
        this.listTapStatistics = createEl('div','list-tap-statistics', '통계', {});

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
        this.monthTapSection = createEl('div','month-tap-section', '', {});

    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.monthTapSection.innerHTML ='';
    }

    createMonthTapNodes() {
        this.monthTapWrap = createEl('div','month-tap-wrap', '', {});
        this.leftArrow = createEl('div','left-arrow', '⇦', {onclick:clickLeftArrow});
        this.selectedMonth = createEl('div','selected-month', '6월', {});
        this.rightArrow = createEl('div','right-arrow', '⇨', {onclick:clickRightArrow});

        appendChildren(this.monthTapWrap, this.leftArrow,this.selectedMonth, this.rightArrow);
        appendChildren(this.monthTapSection, this.monthTapWrap);
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createMonthTapNodes();

        return this.monthTapSection;
    }
}


