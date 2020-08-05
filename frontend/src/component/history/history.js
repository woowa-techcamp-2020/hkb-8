import './history.scss';
import { createEl } from '../../utils/createElement';
import { appendArray } from '../../utils/handleElement';
import { div, input, select, option } from '../../utils/element';
import api from '../../utils/api';


export class History {
    constructor() {
        this.historySection = createEl('div', 'history-section', '', {});
        this.getData();
    }

    // 아직 모델이 안만들어져 있어서 모델에서 History 컴포넌트에 데이터를 주입하는 역할을 한다. 추후 삭제 예정
    async getData() {
        const data = await api.get('http://localhost:3000/api/transaction/abc@abc.com/7').then(res => res.json());
        this.setData(data);

        const result = [];
        let oneDay;
        let preDate = -1000;
        data.forEach(one => {
            const oneDate = new Date(one.paymentAt);
            if (preDate !== oneDate.getDate()) {
                oneDay = {
                    paymentAt: one.paymentAt,
                    totalIncome: 0,
                    totalOutcome: 0,
                    items: [],
                };
                preDate = oneDate.getDate();
                result.push(oneDay);
            }
            const { categoryType, categoryName, paymentMethodName, money, content } = one;
            if (categoryType === "지출") {
                oneDay.totalOutcome += parseInt(money);
            } else {
                oneDay.totalIncome += parseInt(money);
            }
            oneDay.items.push({ categoryType, categoryName, paymentMethodName, money, content });
        });
        return result;
    }

    setData(data) {
        this.data = data;
    }

    reset() {
        this.historySection.innerHTML = '';
    }

    async createHistoryWrap(data1) {
        const data = await this.getData();
        console.log(data);

        const rr = data.map(one => this.createOneDate(one))
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
                div({ className: `${detailData.categoryType === "수입" ? "income" : "outcome"}-money` }, detailData.money)));            // 금액
    }

    async createHistory() {
        const historyWrap = await this.createHistoryWrap();
        this.historySection.appendChild(historyWrap);
    }

    render() {
        this.reset();
        this.createHistory();

        return this.historySection;
    }
}

