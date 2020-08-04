export const clickDeleteInputInfoBtn = function (e) {
    // console.log(e);
};

export const clickIncomeBtn = function (e) {

    e.target.classList.add('clicked');
    document.querySelector('.classification-outcome').classList.remove('clicked');

    const incomeSelect = document.querySelector('.income-select');
    incomeSelect.classList.remove('hidden');
    const outcomeSelect = document.querySelector('.outcome-select');
    outcomeSelect.classList.add('hidden');
};

export const clickOutcomeBtn = function (e) {
    e.target.classList.add('clicked');
    document.querySelector('.classification-income').classList.remove('clicked');

    const incomeSelect = document.querySelector('.income-select');
    incomeSelect.classList.add('hidden');
    const outcomeSelect = document.querySelector('.outcome-select');
    outcomeSelect.classList.remove('hidden');
};

const TEXT_LENGTH = 15;
export const keyupMoneyInput = function (e) {

    let numText = (e.target.value).match(/\d+/g);
    if (numText) {
        numText = +numText.join("").substring(0, TEXT_LENGTH);
    }
    e.target.value = numText ? numberFormat(numText) : "";
}

const numberFormatkoKr = new Intl.NumberFormat('ko-KR');

function numberFormat(num) {
    return numberFormatkoKr.format(num);
}

