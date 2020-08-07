import './history.scss';
import { createEl } from '../../utils/createElement';
import { appendArray } from '../../utils/handleElement';
import { div, input, select, option } from '../../utils/element';
import api from '../../utils/api';
import { numberFormat, decoNumberFormat } from '../../utils/etc';

export class History {
    constructor(parent) {
        this.parent = parent;
        this.historySection = createEl('div', 'history-section', '', {});
        this.setInfoToInput = this.setInfoToInput.bind(this);
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
                div({ className: 'history-day' }, data.paymentAt.split('T')[0]),
                div({ className: 'date-money-wrap' },
                    div({ className: 'day-income' }, decoNumberFormat(data.totalIncome, true)),
                    div({ className: 'day-outcome' }, decoNumberFormat(data.totalOutcome, false)))),

            div({ className: 'history-day-list-wrap' },
                ...data.items.map(item => this.createOneDateDetail(item))
            )
        );
    }
    // day-income
    // day-outcome
    createOneDateDetail(detailData) {
        const { memberNo, recordNo, paymentMethodNo, categoryNo, categoryName, categoryType, content, paymentName, money, paymentAt } = detailData;
        return div({ className: `history-day-item day-${categoryType === '수입' ? 'income' : 'outcome'} line`, dataset: { recordNo, paymentMethodNo, categoryNo, content, paymentAt, money, categoryType } },
            div({ className: 'history-day-item-left' },
                div({ className: `history-day-${categoryType === '수입' ? 'income' : 'outcome'}-category` }, categoryName), // 카테고리
                div({ className: 'history-day-content' }, content)),           // 컨텐츠
            div({ className: 'history-repair', onclick: this.setInfoToInput }, '✐'),
            div({ className: 'history-day-item-right' },
                div({ className: 'payment' }, paymentName),                      // 결제수단
                div({ className: `${categoryType === '수입' ? 'income' : 'outcome'}-money` }, decoNumberFormat(money, categoryType === '수입'))));            // 금액
    }

    setInfoToInput(e) {

        const dataset = e.target.parentElement.dataset;
        const data = {
            recordNo: dataset.recordno,
            paymentNo: dataset.paymentno,
            paymentMethodNo: dataset.paymentmethodno,
            categoryNo: dataset.categoryno,
            categoryType: dataset.categorytype,
            content: dataset.content,
            paymentAt: dataset.paymentat,
            money: dataset.money
        };

        this.parent.setDataToInput(data);
    }

    createHistory(monthModel) {
        const historyWrap = this.createHistoryWrap(monthModel);
        this.historySection.appendChild(historyWrap);
    }

    render(monthModel) {
        console.log(monthModel);
        this.reset();
        this.createHistory(monthModel);

        return this.historySection;
    }
}

