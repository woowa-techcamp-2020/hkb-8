let inputClassification = "수입";
let inputMoney;

// TODO : input에 붙일 것.
export const clickSubmitBtn = function (e) {
    // 결제 날짜
    const dateText = document.querySelector('.input-date-text').value;
    if (!dateText) return alert("날짜가 제대로 입력되지 않았습니다.");

    // 카테고리
    const category = (inputClassification === '수입')
        ? document.querySelector('.income-select').value
        : document.querySelector('.outcome-select').value;

    if (category === "선택해주세요") return alert("카테고리를 선택해 주세요");

    // 결제 수단
    const paymentMethod = document.querySelector('.payment-method-select').value;
    if (paymentMethod === "선택해주세요") return alert("결제 수단을 선택해 주세요");

    // money
    const money = parseInt(inputMoney);
    if (money <= 0 || Number.isNaN(money)) return alert("금액을 입력해 주세요");

    // 내용
    const content = document.querySelector('.input-content-text').value.trim();
    if (!content) return alert("내용을 입력해 주세요");

    const result = { dateText, category, paymentMethod, money, content };
    console.log(result);

    // api로 보내기
    window.model.addNewPaymentRecord(result);
    // 그 이후 결과값 받기

    // 모델에 보내야 함. 
}

export const clickDeleteInputInfoBtn = function (e) {
    // console.log(e);
};

export const clickIncomeBtn = function (e) {
    inputClassification = "수입";
    console.log("in " + inputClassification);

    e.target.classList.add('clicked');
    document.querySelector('.classification-outcome').classList.remove('clicked');

    const incomeSelect = document.querySelector('.income-select');
    incomeSelect.classList.remove('hidden');
    const outcomeSelect = document.querySelector('.outcome-select');
    outcomeSelect.classList.add('hidden');
};

export const clickOutcomeBtn = function (e) {
    inputClassification = "지출";
    console.log("out " + inputClassification);

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
    inputMoney = numText;
    e.target.value = numText ? numberFormat(numText) : "";
}

const numberFormatkoKr = new Intl.NumberFormat('ko-KR');

function numberFormat(num) {
    return numberFormatkoKr.format(num);
}

