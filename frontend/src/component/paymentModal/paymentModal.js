import './paymentModal.scss';
import { createEl } from '../../utils/createElement';
import { appendArray } from '../../utils/handleElement';
import { div, input, select, option, button } from '../../utils/element';


export class PaymentModal {
    constructor() {
        this.paymentModalSection = createEl('div', 'payment-modal-section', '', {});

    }

    setData(data) {
        this.data = data;
    }

    reset() {
        this.paymentModalSection.innerHTML = '';
    }

    createPaymentModalWrap() {
        const paymentModalWrap = div({ className: 'payment-modal-wrap' },
            div({ className: 'payment-modal-header' },
                div({ className: 'payment-modal-header-top' },
                    div({ className: 'payment-modal-close-btn' }, 'X')),
                div({ className: 'payment-modal-header-bottom' },
                    div({ className: 'payment-modal-title' }, '결제 수단 관리'))),
            div({ className: 'payment-modal-body' },
                div({ className: 'payment-method-register-wrap' },
                    div({ className: 'payment-method-name' }, '결제 수단 이름'),
                    input({ className: 'payment-method-input' }),
                    button({ className: 'payment-method-register-btn' }, '등록')),
                div({ className: 'payment-list' },
                    div({ className: 'payment-item-wrap' },
                        div({ className: 'payment-item-name' }, '현대카드'),
                        button({ className: 'payment-item-delete-btn' }, 'X')),
                    div({ className: 'payment-item-wrap' },
                        div({ className: 'payment-item-name' }, '국민은행'),
                        button({ className: 'payment-item-delete-btn' }, 'X')),
                    div({ className: 'payment-item-wrap' },
                        div({ className: 'payment-item-name' }, '현금'),
                        button({ className: 'payment-item-delete-btn' }, 'X'))
                )));
        return paymentModalWrap;
    }

    createPaymentModal() {
        appendArray(this.paymentModalSection, [this.createPaymentModalWrap()]);
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createPaymentModal();
        return this.paymentModalSection;
    }
}

