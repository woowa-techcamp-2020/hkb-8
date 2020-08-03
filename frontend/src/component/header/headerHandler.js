import { PaymentModal } from '../paymentModal/paymentModal'

const paymentModal = new PaymentModal();

export const clickPaymentManageBtn = function(e) {
    const body = document.querySelector('body');
    body.appendChild(paymentModal.render());

};