import { createEl } from '../../utils/createElement';
import { div } from '../../utils/element';
import { appendArray } from '../../utils/handleElement';
import { decoNumberFormat } from '../../utils/etc';
import './calender.scss';
import { TotalInOutcome } from '../totalInOutcome/TotalInOutcome';


export class Calender {
    constructor() {
        this.calenderSection = createEl('div', 'calender-section', '', {});
        this.date = new Date();
        this.monthModel;
        this.totalMoney = new TotalInOutcome();
    }
    moveMonth(value) {
        this.date.setMonth(this.date.getMonth() + value);
    }

    reset() {
        this.calenderSection.innerHTML = '';
    }

    renderCalendar(monthModel) {

        const year = monthModel.year;
        const month = monthModel.month - 1;
        const date = new Date(year, month, 1);


        const monthDays = this.calenderSection.querySelector('.days');

        const lastDay = new Date(year, month + 1, 0).getDate();
        const prevLastDay = new Date(year, month, 0).getDate();

        const firstDayIndex = date.getDay();
        const lastDayIndex = new Date(year, month + 1, 0).getDay();

        const nextDays = 7 - lastDayIndex - 1;

        let days = '';

        days += this.createPrevDays(prevLastDay, firstDayIndex);
        days += this.createCurrentDays(lastDay, monthModel);
        days += this.createNextDays(nextDays);

        monthDays.innerHTML = days;
    }

    createPrevDays(prevLastDay, firstDayIndex) {
        let prevDay = prevLastDay - firstDayIndex + 1;
        let daysInnerHtml = '';
        for (prevDay; prevDay <= prevLastDay; prevDay++) {
            daysInnerHtml += `<div class="prev-date day">${prevDay}
                        <div class="day-in-put-money">
                        <div class="day-income">ㅤ</div>
                        <div class="day-outcome">ㅤ</div>
                        </div></div>`;
        }
        return daysInnerHtml;
    }
    createCurrentDays(lastDay, monthModel) {
        let daysInnerHtml = '';
        const todayDate = new Date();
        const [currentMonth, currentDay] = [todayDate.getMonth() + 1, todayDate.getDate()];

        const drawingMonth = monthModel.month;
        let totalIncome = 0, totalOutcome = 0;

        for (let i = 1; i <= lastDay; i++) {
            const { totalIncome, totalOutcome } = monthModel.getDayTotal(i);
            if (drawingMonth === currentMonth && i === currentDay) {
                daysInnerHtml += `<div class="today day"><span class="number">${i}</span>
                        <div class="day-in-put-money">
                        <div class="day-income">${decoNumberFormat(totalIncome, true) || 'ㅤ'}</div>
                        <div class="day-outcome">${decoNumberFormat(totalOutcome, false) || 'ㅤ'}</div>
                        </div>
                        </div>`;
            } else {
                daysInnerHtml += `<div class="other-day day">${i}
                        <div class="day-in-put-money">
                        <div class="day-income">${decoNumberFormat(totalIncome, true) || 'ㅤ'}</div>
                        <div class="day-outcome">${decoNumberFormat(totalOutcome, false) || 'ㅤ'}</div>
                        </div>
                        </div>`;
            }
        }
        return daysInnerHtml;
    }

    createNextDays(nextDays) {
        let daysInnerHtml = '';

        for (let j = 1; j <= nextDays; j++) {
            daysInnerHtml += `<div class="next-date day">${j}
                        <div class="day-in-put-money">
                        <div class="day-income">ㅤ</div>
                        <div class="day-outcome">ㅤ</div>
                        </div></div>`;
        }

        return daysInnerHtml;

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

    createCalender(monthModel) {
        appendArray(this.calenderSection, [this.totalMoney.render(monthModel), this.createCalenderWrap()]);
    }

    render(monthData) {
        this.reset();
        this.createCalender(monthData);
        this.renderCalendar(monthData);
        return this.calenderSection;
    }
}
