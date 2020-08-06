import './input.scss';
import { createEl } from '../../../utils/createElement';
import { appendArray } from '../../../utils/handleElement';
import { clickDeleteInputInfoBtn, keyupMoneyInput } from './inputHandler.js';
import { numberFormat } from '../../../utils/etc';
import { div, input, select, option } from '../../../utils/element';
import api from '../../../utils/api';

const INCOME_CLICKED = "수입";
const OUTCOME_CLICKED = "지출";

export class Input {
    constructor(parent) {
        this.parent = parent;
        this.inputSection = createEl('div', 'input-section', '', {});
        this.inputClassification = INCOME_CLICKED;
        this.paymentMethods = undefined;

        this.clickIncomeBtn = this.clickIncomeBtn.bind(this);
        this.clickOutcomeBtn = this.clickOutcomeBtn.bind(this);
        this.clickSubmitBtn = this.clickSubmitBtn.bind(this);
        this.setDataToInputElement = this.setDataToInputElement.bind(this);
        this.resetInput = this.resetInput.bind(this);
    }
    async getPaymentMethodData() {
        const paymentMethods = await api.get("http://localhost:3000/api/payment/method/1").then(res => res.json());
        this.paymentMethods = paymentMethods;
    }
    reset() {
        this.inputSection.innerHTML = '';
    }
    createInputBoxWrap() {
        const InputBoxWrap = div({ className: 'input-box-wrap' },
            div({ className: 'input-form' },
                div({ className: 'input-top' },
                    div({ className: 'classification-wrap wrap' },
                        div({ className: 'classification-title title' }, '분류'),
                        div({ className: `classification-income classification-btn ${this.getClicked(INCOME_CLICKED)}`, onclick: this.clickIncomeBtn }, '수입'),
                        div({ className: `classification-outcome classification-btn ${this.getClicked(OUTCOME_CLICKED)}`, onclick: this.clickOutcomeBtn }, '지출')),
                    div({ className: 'delete-input-info-btn', onclick: this.resetInput }, '내용 지우기')),
                div({ className: 'input-middle' },
                    div({ className: 'input-date-wrap wrap' },
                        input({ type: 'hidden', className: 'input-record-no', value: '', name: 'recordNo' }),
                        div({ className: 'input-date-title title' }, '날짜'),
                        input({ className: 'input-date-text text', type: 'date' })),
                    div({ className: 'input-category-wrap wrap' },
                        div({ className: 'input-category-title title' }, '카테고리'),
                        select({ className: `input-category-select income-select select ${this.getHidden(INCOME_CLICKED)}` },
                            option({ className: 'option-list', selected: true, disabled: true, hidden: true }, '선택해주세요'),
                            option({ className: 'option-list', value: "1" }, '월급'),
                            option({ className: 'option-list', value: "2" }, '용돈'),
                            option({ className: 'option-list', value: "3" }, '기타수입')),
                        select({ className: `input-category-select outcome-select select ${this.getHidden(OUTCOME_CLICKED)}` },
                            option({ className: 'option-list', selected: true, disabled: true, hidden: true }, '선택해주세요'),
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
                        select({ className: 'input-payment-select payment-method-select select' },
                            ...this.createSelectOptions(this.paymentMethods)
                        ))),
                div({ className: 'input-bottom' },
                    div({ className: 'input-money-wrap wrap' },
                        div({ className: 'input-money-title title' }, '금액'),
                        input({ className: 'input-money-text text', onkeyup: keyupMoneyInput, placeholder: 0 })),
                    div({ className: 'input-content-wrap wrap' },
                        div({ className: 'input-content-title title' }, '내용'),
                        input({ className: 'input-content-text text' })))),
            div({ className: 'input-submit-btn', onclick: this.clickSubmitBtn }, '확 인'));

        return InputBoxWrap;
    }
    submitHandler() {
    }
    getHidden(type) {
        return this.inputClassification === type ? '' : 'hidden';
    }
    getClicked(type) {
        return this.inputClassification === type ? 'clicked' : '';
    }
    clickIncomeBtn(e) {
        this.inputClassification = INCOME_CLICKED;
        const inputSection = this.inputSection;
        inputSection.querySelector('.classification-income').classList.add('clicked');
        inputSection.querySelector('.classification-outcome').classList.remove('clicked');
        inputSection.querySelector('.income-select').classList.remove('hidden');
        inputSection.querySelector('.outcome-select').classList.add('hidden');
    };

    clickOutcomeBtn(e) {
        this.inputClassification = OUTCOME_CLICKED;
        const inputSection = this.inputSection;
        inputSection.querySelector('.classification-income').classList.remove('clicked');
        inputSection.querySelector('.classification-outcome').classList.add('clicked');
        inputSection.querySelector('.income-select').classList.add('hidden');
        inputSection.querySelector('.outcome-select').classList.remove('hidden');
    };

    setDataToInputElement(data) {
        const inputSection = this.inputSection;

        if (data.categoryType === INCOME_CLICKED) {
            this.clickIncomeBtn();
            inputSection.querySelector('.income-select ').value = data.categoryNo;
        } else {
            this.clickOutcomeBtn();
            inputSection.querySelector('.outcome-select').value = data.categoryNo;
        }
        inputSection.querySelector('.input-record-no').value = data.recordNo;
        inputSection.querySelector('.input-date-text').value = data.paymentAt.split('T')[0];

        inputSection.querySelector('.payment-method-select').value = data.paymentMethodNo;
        inputSection.querySelector('.input-money-text').value = numberFormat(data.money);
        inputSection.querySelector('.input-content-text').value = data.content;
    }
    resetInput() {
        const inputSection = this.inputSection;
        inputSection.querySelector('.input-record-no').value = "";
        inputSection.querySelector('.input-date-text').value = "";
        inputSection.querySelector('.income-select ').value = "선택해주세요";
        inputSection.querySelector('.outcome-select').value = "선택해주세요";
        inputSection.querySelector('.payment-method-select').value = "";
        inputSection.querySelector('.input-money-text').value = "";
        inputSection.querySelector('.input-content-text').value = ""
    }

    clickSubmitBtn(e) {
        // 결제 날짜
        const inputSection = this.inputSection;
        const dateText = inputSection.querySelector('.input-date-text').value;
        if (!dateText) return alert("날짜가 제대로 입력되지 않았습니다.");

        // recordNo
        const recordNo = inputSection.querySelector('.input-record-no').value;
        console.log("recordNo : " + recordNo);

        // 카테고리
        const category = (this.inputClassification === INCOME_CLICKED)
            ? inputSection.querySelector('.income-select').value
            : inputSection.querySelector('.outcome-select').value;

        if (category === "선택해주세요") return alert("카테고리를 선택해 주세요");

        // 결제 수단
        const paymentMethod = inputSection.querySelector('.payment-method-select').value;
        if (paymentMethod === "선택해주세요") return alert("결제 수단을 선택해 주세요");

        // money
        const inputMoney = inputSection.querySelector('.input-money-text').value.match(/\d+/g).join("");
        const money = parseInt(inputMoney);
        if (money <= 0 || Number.isNaN(money)) return alert("금액을 입력해 주세요");

        // 내용
        const content = inputSection.querySelector('.input-content-text').value.trim();
        if (!content) return alert("내용을 입력해 주세요");

        if (recordNo) {
            window.model.updatePaymentRecord({ recordNo, dateText, category, paymentMethod, money, content });
        } else {
            // api로 보내기
            window.model.addNewPaymentRecord({ dateText, category, paymentMethod, money, content });
        }
    }

    createSelectOptions(data) {
        const result = [option({ className: 'option-list', selected: true, disabled: true, hidden: true }, '선택해주세요')];
        const options = data.map(o => option({ className: 'option-list', value: o.no }, o.paymentMethodName));
        result.push(...options);
        return result;
    }

    async createInput() {
        await this.getPaymentMethodData();
        const inputBoxWrap = this.createInputBoxWrap();
        appendArray(this.inputSection, [inputBoxWrap]);
    }

    render() {
        this.reset();
        this.createInput();

        return this.inputSection;
    }
}

