import {createEl} from '../../utils/createElement';
import {appendArray} from '../../utils/handleElement';
import {div, input, span, select} from '../../utils/element';
import './totalInOutcome.scss';

export class TotalInOutcome {
    constructor(router) {
        this.totalMoneySection = createEl('div', 'total-money-section', '', {});
        this.isCheckedIncome = true;
        this.isCheckedOutcome = true;
        this.clickedIncomeCheckboxHandler = this.clickedIncomeCheckboxHandler.bind(this);
        this.clickedOutcomeCheckboxHandler = this.clickedOutcomeCheckboxHandler.bind(this);
    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.totalMoneySection.innerHTML = '';
    }

    clickedIncomeCheckboxHandler() {
        this.isCheckedIncome = !this.isCheckedIncome;
        const dayIncomeMoney = document.querySelectorAll('.day-income');
        const historyLine = document.querySelectorAll('.history-day-item');
        historyLine.forEach((el) => {
            console.log(el.firstChild);

        });
        dayIncomeMoney.forEach((el) => {
            if(this.isCheckedIncome) {
                el.classList.remove('money-hidden');
            } else {
                el.classList.add('money-hidden');
            }
        });
    }

    clickedOutcomeCheckboxHandler() {
        this.isCheckedOutcome = !this.isCheckedOutcome;
        const dayOutcomeMoney = document.querySelectorAll('.day-outcome');
        dayOutcomeMoney.forEach((el) => {
            if(this.isCheckedOutcome) {
                el.classList.remove('money-hidden');
            } else {
                el.classList.add('money-hidden');
            }
        });
    }

    createTotalMoneyWrap(monthModel) {
        const totalMoneyWrap = div({ className: 'total-money-wrap' },
            div({className:'total-income-wrap'},
                input({className:'total-income-checkbox', type:'checkbox', checked:this.isCheckedIncome, onclick:this.clickedIncomeCheckboxHandler}),
                span({className:'total-income-title'}, '수입'),
                span({className:'total-income-money'}, monthModel.totalIncome),
            ),
            div({className:'total-outcome-wrap'},
                input({className:'total-outcome-checkbox',type:'checkbox', checked:this.isCheckedOutcome, onclick:this.clickedOutcomeCheckboxHandler}),
                span({className:'total-outcome-title'}, '지출'),
                span({className:'total-outcome-money'}, monthModel.totalOutcome),
            ),
        );

        return totalMoneyWrap;
    }

    createTotalInOutcome(monthModel) {
        appendArray(this.totalMoneySection, [this.createTotalMoneyWrap(monthModel)]);
    }


    render(monthModel) {
        this.reset();
        this.createTotalInOutcome(monthModel);

        return this.totalMoneySection;
    }
}