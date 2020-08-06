import './history.scss';
import { createEl } from '../../utils/createElement';
import { appendArray } from '../../utils/handleElement';
import { div, input, select, option } from '../../utils/element';
import api from '../../utils/api';
import { numberFormat } from '../../utils/etc';

export class History {
    constructor() {
        this.historySection = createEl('div', 'history-section', '', {});
    }

    reset() {
        this.historySection.innerHTML = '';
    }

    createHistoryWrap(monthModel) {
        const rr = [];

        monthModel.data.forEach(one => {
            rr.push(this.createOneDate(one));
        });
        const historyWrap = div({ className: 'history-wrap' });
        appendArray(historyWrap, rr);
        return historyWrap;
    }

    createOneDate(data) {
        return div({ className: 'history' },
            div({ className: 'history-day-info line' },
                div({ className: 'history-day' }, data.paymentAt),
                div({ className: 'date-money-wrap' },
                    div({ className: 'day-income' }, data.totalIncome),
                    div({ className: 'day-outcome' }, data.totalOutcome))),

            div({ className: 'history-day-list-wrap' },
                ...data.items.map(item => this.createOneDateDetail(item))
            )
        );
    }

    createOneDateDetail(detailData) {
        return div({ className: 'history-day-item line' },
            div({ className: 'history-day-item-left' },
                div({ className: `history-day-${detailData.categoryType === "수입" ? "income" : "outcome"}-category` }, detailData.categoryName), // 카테고리
                div({ className: 'history-day-content' }, detailData.content)),           // 컨텐츠
            div({ className: 'history-repair' }, '수정'),
            div({ className: 'history-day-item-right' },
                div({ className: 'payment' }, detailData.paymentMethodName),                      // 결제수단
                div({ className: `${detailData.categoryType === "수입" ? "income" : "outcome"}-money` }, numberFormat(detailData.money))));            // 금액
    }

    createHistory(monthModel) {
        const historyWrap = this.createHistoryWrap(monthModel);
        this.historySection.appendChild(historyWrap);
    }

    render(monthModel) {
        this.reset();
        this.createHistory(monthModel);

        return this.historySection;
    }
}

