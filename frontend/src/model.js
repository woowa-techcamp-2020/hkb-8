import api from './utils/api';

export default class Model {
    constructor() {
        this.selectedMonth = (new Date()).getMonth() + 1;
        this.subscribers = [];
        this.store = new Map;
        this.setMonthData(this.selectedMonth);
    }
    getMonthData(month) {
        if (!this.store.has(month)) this.setMonthData(month);
        return this.store.get(month);
    }
    async setMonthData(month) {
        const oneMonthData = await this.getServerMonthData(month);
        this.store.set(month, oneMonthData);
    }
    async getServerMonthData(month) {
        const data = await api.get('http://localhost:3000/api/transaction/abc@abc.com/7').then(res => res.json());
        const oneMonthData = new MonthModel(2020, month, data);
        return oneMonthData;
    }
    unsubscribe() {

    }
    subscribe(component) {
        this.subscribers.push(component);
    }
    notify() {
        const data = this.getMonthData(this.selectedMonth);
        this.subscribers.forEach(subscriber => subscriber.render(data));
    }
}

class MonthModel {
    constructor(year, month, data) {
        this.year = year;
        this.month = month;
        this.data = new Map;
        this.initData(data);
    }
    initData(data) {
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
                preDate = oneDate.getDate()
                this.data.set(preDate, oneDay);
            }
            const { categoryType, categoryName, paymentMethodName, money, content } = one;
            if (categoryType === "지출") {
                oneDay.totalOutcome += parseInt(money);
            } else {
                oneDay.totalIncome += parseInt(money);
            }
            oneDay.items.push({ categoryType, categoryName, paymentMethodName, money, content });
        });
    }
}