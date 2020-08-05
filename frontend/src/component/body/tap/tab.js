import './tab.scss';
import { createEl } from '../../../utils/createElement';
import { appendArray } from '../../../utils/handleElement';



export class ListTab {
    constructor(router) {
        this.router = router;
        this.clickedTab = 'history';
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
        this.listTapHistoryWrap = createEl('div', `list-tap-history-wrap list ${this.clickedTab === 'history' ? 'clicked-tab' : ''}`, '', { onclick: e => this.clickHandler(e, '/history') });
        this.listTapHistory = createEl('div', 'list-tap-history tap', '내역', {});
        // this.listTapContour = createEl('div','list-tap-contour', '|', {});
        this.listTapCalenderWrap = createEl('div', `list-tap-calender-wrap list ${this.clickedTab === 'calender' ? 'clicked-tab' : ''}`, '', { onclick: e => this.clickHandler(e, '/calender') });
        this.listTapCalender = createEl('div', 'list-tap-calender tap', '달력', {});
        this.listTapStatisticsWrap = createEl('div', `list-tap-statistics-wrap list ${this.clickedTab === 'chart' ? 'clicked-tab' : ''}`, '', { onclick: e => this.clickHandler(e, '/chart') });
        this.listTapStatistics = createEl('div', 'list-tap-statistics tap', '통계', {});

        appendArray(this.listTapWrap, [this.listTapHistoryWrap, this.listTapCalenderWrap, this.listTapStatisticsWrap]);
        appendArray(this.listTapHistoryWrap, [this.listTapHistory]);
        appendArray(this.listTapCalenderWrap, [this.listTapCalender]);
        appendArray(this.listTapStatisticsWrap, [this.listTapStatistics]);
        appendArray(this.listTapSection, [this.listTapWrap]);
    }
    clickHandler(e, path) {
        this.clickedTab = path.substr(1);
        // const path = getCurrentPath(e, path);
        // const state = getStates(path);
        const state = {};
        this.router.go(path, state);
    }

    render() {
        this.reset();
        this.createListTap();

        return this.listTapSection;
    }
}

export class MonthTab {
    constructor(router) {
        this.router = router;
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
        this.selectedMonth = createEl('div', 'selected-month date', `2020.${this.currentMonth}`, {});

        this.leftArrow = createEl('div', 'left-arrow prev', '⇦', {});
        this.rightArrow = createEl('div', 'right-arrow next', '⇨', {});

        appendArray(this.monthTapWrap, [this.leftArrow, this.selectedMonth, this.rightArrow]);
        appendArray(this.monthTapSection, [this.monthTapWrap]);

        this.leftArrow.addEventListener('click', e => {
            if (this.currentMonth === 1) return;
            this.currentMonth--;
            this.render();
            window.model.decreaseMonth();
        });

        this.rightArrow.addEventListener('click', e => {
            if (this.currentMonth === 12) return;
            this.currentMonth++;
            this.render();
            window.model.increaseMonth();
        });
    }

    render() {
        this.reset();
        this.createMonthTapNodes();

        return this.monthTapSection;
    }
}


