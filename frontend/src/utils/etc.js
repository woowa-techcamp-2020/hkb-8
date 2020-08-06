
const numberFormatkoKr = new Intl.NumberFormat('ko-KR');

export function numberFormat(num) {
    return numberFormatkoKr.format(num);
}