import { createEl } from "../../utils/createElement";
import { div } from "../../utils/element";
import { appendArray } from "../../utils/handleElement";
import './calender.scss'

export class Calender {
    constructor() {
        this.calenderSection = createEl('div', 'calender-section', '', {});
        this.date = new Date();

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
            days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
        }

        for (let i = 1; i <= lastDay; i++) {
            if (
                i === new Date().getDate() &&
                date.getMonth() === new Date().getMonth()
            ) {
                days += `<div class="today">${i}</div>`;
            } else {
                days += `<div>${i}</div>`;
            }
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="next-date">${j}</div>`;
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
