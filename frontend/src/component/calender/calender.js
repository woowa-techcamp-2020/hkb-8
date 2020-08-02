import {createEl} from "../../utils/createElement";
import {div} from "../../utils/element";
import {appendChildren} from "../../utils/appendChildren";
import './calender.scss'

export class Calender {
    constructor() {
        this.calenderSection = createEl('div','calender-section', '', {});
        this.date = new Date();

    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.calenderSection.innerHTML ='';
    }

    createCalenderWrap() {
        const calenderWrap = div({className:'calendar-wrap'},
                div({className:'weekends'},
                    div({className:''}, 'Sun'),
                    div({className:''}, 'Mon'),
                    div({className:''}, 'Tue'),
                    div({className:''}, 'Wed'),
                    div({className:''}, 'Thu'),
                    div({className:''}, 'Fri'),
                    div({className:''}, 'Sat'),
                ),
                div({className:'days'},
                    div({className:'prev-date'},'1'),
                    div({className:'prev-date'},'1'),
                    div({className:'prev-date'},'1'),
                    div({className:'prev-date'},'1'),
                    div({className:'today'},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'10'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'20'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:''},'1'),
                    div({className:'next-date'},'1'),
                    div({className:'next-date'},'30'),
                        ));
        return calenderWrap;
    }

    renderCalendar() {
        this.date.setDate(1);

        const monthDays = document.querySelector(".days");

        const lastDay = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            0
        ).getDate();

        const prevLastDay = new Date(
            this.date.getFullYear(),
            this.date.getMonth(),
            0
        ).getDate();

        const firstDayIndex = this.date.getDay();

        const lastDayIndex = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            0
        ).getDay();

        const nextDays = 7 - lastDayIndex - 1;

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        document.querySelector(".date").innerHTML = months[this.date.getMonth()];

        // document.querySelector(".date p").innerHTML = new Date().toDateString();

        let days = "";

        for (let x = firstDayIndex; x > 0; x--) {
            days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
        }

        for (let i = 1; i <= lastDay; i++) {
            if (
                i === new Date().getDate() &&
                this.date.getMonth() === new Date().getMonth()
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

    createCalender() {
        appendChildren(this.calenderSection, this.createCalenderWrap());
    }


    render() {
        // return this.baseElement;
        this.reset();
        this.createCalender();
        // this.renderCalendar();

        return this.calenderSection;
    }

}
