import './input.scss';
import { createEl } from '../../../utils/createElement';
import { appendChildren } from '../../../utils/appendChildren';
import { clickDeleteInputInfoBtn, clickIncomeBtn, clickOutcomeBtn } from './inputHandler.js';
import { div, input, select, option } from '../../../utils/element';
import { func } from './inputHandler';


export class Input {
    constructor() {
        this.inputSection = createEl('div', 'input-section', '', {});

    }
    setData(data) {
        this.data = data;
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
                        div({ className: 'classification-income classification-btn', onclick: clickIncomeBtn }, '수입'),
                        div({ className: 'classification-outcome classification-btn', onclick: clickOutcomeBtn }, '지출')),
                    div({ className: 'delete-input-info-btn', onclick: clickDeleteInputInfoBtn }, '내용 지우기')),
                div({ className: 'input-middle' },
                    div({ className: 'input-date-wrap wrap' },
                        div({ className: 'input-date-title title' }, '날짜'),
                        input({ className: 'input-date-text text' })),
                    div({ className: 'input-category-wrap wrap' },
                        div({ className: 'input-category-title title' }, '카테고리'),
                        select({ className: 'input-category-select select' },
                            option({ className: 'option-list' }, '선택해주세요'),
                            option({ className: 'option-list' }, '선택해주세요'),
                            option({ className: 'option-list' }, '선택해주세요'))),
                    div({ className: 'input-payment-select-wrap wrap' },
                        div({ className: 'input-payment-select-title title' }, '결제수단'),
                        select({ className: 'input-payment-select select' },
                            option({ className: 'option-list' }, '선택해주세요'),
                            option({ className: 'option-list' }, '선택해주세요'),
                            option({ className: 'option-list' }, '선택해주세요'),
                        ))),
                div({ className: 'input-bottom' },
                    div({ className: 'input-money-wrap wrap' },
                        div({ className: 'input-money-title title' }, '금액'),
                        input({ className: 'input-money-text text' })),
                    div({ className: 'input-content-wrap wrap' },
                        div({ className: 'input-content-title title' }, '내용'),
                        input({ className: 'input-content-text text' })))),
            div({ className: 'input-submit-btn' }, '확 인'));

        return InputBoxWrap;
    }

    createInput() {
        const inputBoxWrap = this.createInputBoxWrap();
        // console.log(inputBoxWrap);
        appendChildren(this.inputSection, inputBoxWrap);
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createInput();

        return this.inputSection;
    }
}

