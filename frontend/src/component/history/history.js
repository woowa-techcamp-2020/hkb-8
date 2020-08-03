import './history.scss';
import {createEl} from '../../utils/createElement';
import {appendChildren} from '../../utils/appendChildren';
import {div, input, select, option} from '../../utils/element';


export class History {
    constructor() {
        this.historySection = createEl('div', 'history-section', '', {});

    }

    setData(data) {
        this.data = data;
    }

    reset() {
        this.historySection.innerHTML = '';
    }

    createHistoryWrap() {
        const historyWrap = div({className: 'history-wrap'},
            div({className: 'history'},
                div({className: 'history-day-info line'},
                    div({className: 'history-day'}, '8월 2일 일'),
                    div({className: 'date-money-wrap'},
                        div({className: 'day-income'}, '+0원'),
                        div({className: 'day-outcome'}, '-20000원'))),
                div({className: 'history-day-list-wrap'},
                    div({className: 'history-day-item line'},
                        div({className: 'history-day-item-left'},
                            div({className: 'history-day-income-category'}, '쇼핑/뷰티'),
                            div({className: 'history-day-content'}, '헤어샵')),
                        div({className: 'history-repair'}, '수정'),
                        div({className: 'history-day-item-right'},
                            div({className: 'payment'}, '현대카드'),
                            div({className: 'income-money'}, '-20,000원'))))
            ),
            div({className: 'history'},
                div({className: 'history-day-info line'},
                    div({className: 'history-day'}, '8월 3일 월'),
                    div({className: 'date-money-wrap'},
                        div({className: 'day-income'}, '+90,000원'),
                        div({className: 'day-outcome'}, '0원'))),
                div({className: 'history-day-list-wrap'},
                    div({className: 'history-day-item line'},
                        div({className: 'history-day-item-left'},
                            div({className: 'history-day-outcome-category'}, '월급'),
                            div({className: 'history-day-content'}, '월급')),
                        div({className: 'history-repair'}, '수정'),
                        div({className: 'history-day-item-right'},
                            div({className: 'payment'}, '삼성카드'),
                            div({className: 'outcome-money'}, '+40,000원'))),
                    div({className: 'history-day-item line'},
                        div({className: 'history-day-item-left'},
                            div({className: 'history-day-outcome-category'}, '용돈'),
                            div({className: 'history-day-content'}, '용돈')),
                        div({className: 'history-repair'}, '수정'),
                        div({className: 'history-day-item-right'},
                            div({className: 'payment'}, '국민은행'),
                            div({className: 'outcome-money'}, '+50,000원'))))
            ));
        return historyWrap;
    }

    createHistory() {
        appendChildren(this.historySection, this.createHistoryWrap());
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createHistory();

        return this.historySection;
    }
}

