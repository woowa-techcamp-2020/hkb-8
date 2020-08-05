import {createEl} from '../../utils/createElement';
import {appendArray} from '../../utils/handleElement';
import {div, input, span, select} from '../../utils/element';

export class TotalInOutcome {
    constructor(router) {
        // this.router = router;
        // this.clickedTab = 'history';
        this.calcTotalIncome;
        this.calcTotalOutcome;
        this.totalMoneySection = createEl('div', 'total-money-section', '', {});

    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.totalMoneySection.innerHTML = '';
    }

    createTotalMoneyWrap() {
        const totalMoneyWrap = div({ className: 'total-money-wrap' },
            div({className:'total-income-wrap'},
                input({className:'total-income-checkbox',type:'checkbox'}),
                span({className:'total-income-title'}, '수입'),
                span({className:'total-income-money'}, ${this.calcTotalIncome}),
            ),
            div({className:'total-outcome-wrap'},
                input({className:'total-outcome-checkbox',type:'checkbox'}),
                span({className:'total-outcome-title'}, '지출'),
                span({className:'total-outcome-money'}, 2000),
            ),
        );

        return totalMoneyWrap;
    }

    createTotalInOutcome() {
        appendArray(this.totalMoneySection, [this.createTotalMoneyWrap()]);
    }


    render() {
        this.reset();
        this.createTotalInOutcome();

        return this.totalMoneySection;
    }
}