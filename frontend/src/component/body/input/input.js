import './input.scss';
import { createEl } from '../../../utils/createElement';
import { appendArray } from '../../../utils/handleElement';
import { clickDeleteInputInfoBtn, clickIncomeBtn, clickOutcomeBtn, keyupMoneyInput } from './inputHandler.js';
import { div, input, select, option } from '../../../utils/element';
import { func } from './inputHandler';
import api from '../../../utils/api';


export class Input {
    constructor() {
        this.inputSection = createEl('div', 'input-section', '', {});

    }
    setData(data) {
        this.data = data;
    }
    async getPaymentMethodData() {
        const paymentMethods = await api.get("http://localhost:3000/api/payment/method/1").then(res => res.json());
        this.paymentMethods = paymentMethods;

    }

    reset() {
        this.paymentMethods;
        this.inputSection.innerHTML = '';
    }

    createInputBoxWrap() {
        const InputBoxWrap = div({ className: 'input-box-wrap' },
            div({ className: 'input-form' },
                div({ className: 'input-top' },
                    div({ className: 'classification-wrap wrap' },
                        div({ className: 'classification-title title' }, '분류'),
                        div({ className: 'classification-income classification-btn clicked', onclick: clickIncomeBtn }, '수입'),
                        div({ className: 'classification-outcome classification-btn', onclick: clickOutcomeBtn }, '지출')),
                    div({ className: 'delete-input-info-btn', onclick: clickDeleteInputInfoBtn }, '내용 지우기')),
                div({ className: 'input-middle' },
                    div({ className: 'input-date-wrap wrap' },
                        div({ className: 'input-date-title title' }, '날짜'),
                        input({ className: 'input-date-text text', type: 'date' })),
                    div({ className: 'input-category-wrap wrap' },
                        div({ className: 'input-category-title title' }, '카테고리'),
                        select({ className: 'input-category-select income-select select' },
                            option({ className: 'option-list', select: true, disable: true, hidden: true }, '선택해주세요'),
                            option({ className: 'option-list', value: "1" }, '월급'),
                            option({ className: 'option-list', value: "2" }, '용돈'),
                            option({ className: 'option-list', value: "3" }, '기타수입')),
                        select({ className: 'input-category-select outcome-select select hidden' },
                            option({ className: 'option-list', select: true, disable: true, hidden: true }, '선택해주세요'),
                            option({ className: 'option-list', value: "4" }, '식비'),
                            option({ className: 'option-list', value: "5" }, '생활'),
                            option({ className: 'option-list', value: "6" }, '쇼핑/뷰티'),
                            option({ className: 'option-list', value: "7" }, '교통'),
                            option({ className: 'option-list', value: "8" }, '의료/건강'),
                            option({ className: 'option-list', value: "9" }, '문화/여가'),
                            option({ className: 'option-list', value: "10" }, '미분류'))
                    ),
                    div({ className: 'input-payment-select-wrap wrap' },
                        div({ className: 'input-payment-select-title title' }, '결제수단'),
                        select({ className: 'input-payment-select select' },
                            ...this.createSelectOptions(this.paymentMethods)
                        ))),
                div({ className: 'input-bottom' },
                    div({ className: 'input-money-wrap wrap' },
                        div({ className: 'input-money-title title' }, '금액'),
                        input({ className: 'input-money-text text', onkeyup: keyupMoneyInput, placeholder: 0 })),
                    div({ className: 'input-content-wrap wrap' },
                        div({ className: 'input-content-title title' }, '내용'),
                        input({ className: 'input-content-text text' })))),
            div({ className: 'input-submit-btn' }, '확 인'));

        return InputBoxWrap;
    }
    createSelectOptions(data) {
        const result = [option({ className: 'option-list', select: true, disable: true, hidden: true }, '선택해주세요')];
        const options = data.map(o => option({ className: 'option-list', value: data.no }, o.paymentMethodName));
        result.push(...options);
        return result;
    }

    async createInput() {
        await this.getPaymentMethodData();
        const inputBoxWrap = await this.createInputBoxWrap();
        appendArray(this.inputSection, [inputBoxWrap]);
    }

    render() {
        this.getPaymentMethodData();
        this.reset();
        this.createInput();

        return this.inputSection;
    }
}

