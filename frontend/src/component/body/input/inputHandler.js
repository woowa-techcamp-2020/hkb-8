import { numberFormat } from '../../../utils/etc';

export const clickDeleteInputInfoBtn = function (e) {
    // console.log(e);
};


const TEXT_LENGTH = 15;
export const keyupMoneyInput = function (e) {

    let numText = (e.target.value).match(/\d+/g);
    if (numText) {
        numText = +numText.join("").substring(0, TEXT_LENGTH);
    }
    inputMoney = numText;
    e.target.value = numText ? numberFormat(numText) : "";
}
