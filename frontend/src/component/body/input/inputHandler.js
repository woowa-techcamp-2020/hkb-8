export const clickDeleteInputInfoBtn = function (e) {
    // console.log(e);
};

export const clickIncomeBtn = function (e) {
    // console.log(e);
};

export const clickOutcomeBtn = function (e) {
    // console.log(e);
};

const TEXT_LENGTH = 15;
export const keyupMoneyInput = function (e) {

    let numText = (e.target.value).match(/\d+/g);
    if (numText) {
        numText = +numText.join("").substring(0, TEXT_LENGTH);
    }
    e.target.value = numText ? numberFormat(numText) : "";
}

const numberFormatkoKr = new Intl.NumberFormat('ko-KR', { maximumSignificantDigits: 14 });

function numberFormat(num) {
    return numberFormatkoKr.format(num);
}