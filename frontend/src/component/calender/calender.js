import { createEl } from "../../utils/createElement";
import { div } from "../../utils/element";
import { appendArray } from "../../utils/handleElement";
import './calender.scss'
import json from '../../utils/mockData.json';

export class Calender {
    constructor() {
        this.calenderSection = createEl('div', 'calender-section', '', {});
        this.date = new Date();

        this.incomeMoneyMap = new Map();
        this.incomeMoneyMap = json.incomeMoneyObj;
        this.outcomeMoneyMap = new Map();

    }
    setData(data) {
        this.data = data;
    }
    moveMonth(value) {
        this.date.setMonth(this.date.getMonth() + value);
    }

    reset() {
        this.calenderSection.innerHTML = '';
    }

    getApiDayData() {
        // todo: api요청으로 현재 월을 보내서 현재 월에 대한 모든 날짜의 수입, 지출 받아오기
        // todo: 받아온 데이터를 incomeMoneyMap (key:일수,val:수입금액), outcomeMoneyMap 에 넣기(key:일수,val:지출금액)
         }



    renderCalendar() {
        const date = this.date;
        date.setDate(1);

        const monthDays = this.calenderSection.querySelector(".days");

        const lastDay = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        const prevLastDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDate();

        const firstDayIndex = date.getDay();

        const lastDayIndex = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDay();

        const nextDays = 7 - lastDayIndex - 1;

        const months = [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
        ];

        let days = '';

        for (let x = firstDayIndex; x > 0; x--) {
            days += `<div class="prev-date day">${prevLastDay - x + 1}</div>`;
        }

        for (let i = 1; i <= lastDay; i++) {
            if (
                i === new Date().getDate() &&
                date.getMonth() === new Date().getMonth()
            ) {
                days += `<div class="today day">${i}
<div class="day-in-put-money">
<div class="day-income">+ ${this.incomeMoneyMap[i]}</div>
<div class="day-outcome">-4,000원</div>
</div>
</div>`;
            } else {
                days += `<div class="other-day day">${i}
<div class="day-in-put-money">
<div class="day-income">+ ${this.incomeMoneyMap[i]}</div>
<div class="day-outcome">-4,000원</div>
</div>
</div>`;
            }
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="next-date day">${j}</div>`;
            monthDays.innerHTML = days;
        }
    }

    createCalenderWrap() {
        const calenderWrap = div({ className: 'calendar-wrap' },
            div({ className: 'weekends' },
                div({ className: '' }, 'Sun'),
                div({ className: '' }, 'Mon'),
                div({ className: '' }, 'Tue'),
                div({ className: '' }, 'Wed'),
                div({ className: '' }, 'Thu'),
                div({ className: '' }, 'Fri'),
                div({ className: '' }, 'Sat')),
            div({ className: 'days' },
            ));
        return calenderWrap;
    }

    createCalender() {
        appendArray(this.calenderSection, [this.createCalenderWrap()]);
    }

    render() {
        this.reset();
        this.createCalender();
        this.renderCalendar();
        return this.calenderSection;
    }
}
