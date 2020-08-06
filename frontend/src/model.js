import api from './utils/api';

export default class Model {
    constructor() {
        this.selectedMonth = (new Date()).getMonth() + 1;
        this.subscribers = [];
        this.store = new Map;
        this.setMonthData(this.selectedMonth);
    }
    async addNewPaymentRecord({ dateText, category, paymentMethod, money, content }) {
        const result = await api.post(`http://localhost:3000/api/transaction/1/${this.selectedMonth}`, { dateText, category, paymentMethod, money, content });
        this.setMonthData(this.selectedMonth);
    }
    async updatePaymentRecord({ recordNo, dateText, category, paymentMethod, money, content }) {
        const result = await api.put(`http://localhost:3000/api/transaction/1/${this.selectedMonth}`, { recordNo, dateText, category, paymentMethod, money, content });
        this.setMonthData(this.selectedMonth);
    }
    decreaseMonth() {
        if (this.selectedMonth === 1) return;
        this.selectedMonth--;
        this.setMonthData(this.selectedMonth);
    }
    increaseMonth() {
        if (this.selectedMonth === 12) return;
        this.selectedMonth++;
        this.setMonthData(this.selectedMonth);
    }
    async getMonthData(month) {
        month = month !== undefined ? month : this.selectedMonth;
        if (!this.store.has(month)) await this.setMonthData(month);
        return this.store.get(month);
    }
    async setMonthData(month) {
        const oneMonthData = await this.getServerMonthData(month);
        await this.store.set(month, oneMonthData);
        this.notify();
    }
    async getServerMonthData(month) {
        const data = await api.get(`http://localhost:3000/api/transaction/abc@abc.com/${month}`).then(res => res.json());
        const oneMonthData = new MonthModel(2020, month, data);
        return oneMonthData;
    }
    unsubscribe() {
        this.subscribers.length = 0;
    }
    subscribe(component) {
        this.subscribers = this.subscribers.concat(component);
    }
    async notify() {
        const data = await this.getMonthData(this.selectedMonth);
        this.subscribers.forEach(subscriber => subscriber.render(data));
    }
}

class MonthModel {
    constructor(year, month, data) {
        this.year = year;
        this.month = month;
        this.totalIncome = 0;
        this.totalOutcome = 0;
        this.data = new Map;
        this.initData(data);
    }
    getTotal() {
        return { totalIncome: this.totalIncome, totalOutcome: this.totalOutcome };
    }
    getDayTotal(day) {
        const dayData = this.data.get(day);
        let totalIncome, totalOutcome;
        if (dayData === undefined) {
            totalIncome = "";
            totalOutcome = "";
        } else {
            totalIncome = dayData.totalIncome;
            totalOutcome = dayData.totalOutcome;
        }
        return ({ totalIncome, totalOutcome });
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
            const { categoryType, money } = one;
            if (categoryType === "지출") {
                oneDay.totalOutcome += parseInt(money);
                this.totalOutcome += parseInt(money);
            } else {
                oneDay.totalIncome += parseInt(money);
                this.totalIncome += parseInt(money);
            }
            oneDay.items.push(one);
        });
    }
}