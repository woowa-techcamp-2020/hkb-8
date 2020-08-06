
const numberFormatkoKr = new Intl.NumberFormat('ko-KR');

export function numberFormat(num) {
    return numberFormatkoKr.format(num);
}

export function decoNumberFormat(num, flag) {
    if (num <= 0) return '';
    return `${flag ? '+' : '-'} ${numberFormat(num)}`;
}
