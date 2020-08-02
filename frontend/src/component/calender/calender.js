import {createEl} from "../../utils/createElement";
import {div} from "../../utils/element";
import {appendChildren} from "../../utils/appendChildren";
import './calender.scss'

export class Calender {
    constructor() {
        this.calenderSection = createEl('div','calenderApp-section', '', {});
    }
    setData(data) {
        this.data = data;
    }

    reset() {
        this.calenderSection.innerHTML ='';
    }

    createCalenderWrap() {
        const calenderWrap = div({className:'calenderApp-section'},
            div({className:'calendar-wrap'},
                div({className:'weekdays'},
                    div({className:''}, 'Sun'),
                    div({className:''}, 'Mon'),
                    div({className:''}, 'Tue'),
                    div({className:''}, 'Wed'),
                    div({className:''}, 'Thu'),
                    div({className:''}, 'Fri'),
                    div({className:''}, 'Sat'),
                ),
                div({className:'days'})));
        return calenderWrap;
    }

    createCalender() {
        // const calenderWrap = this.createCalenderWrap();
        appendChildren(this.calenderSection, this.createCalenderWrap());
    }

    render() {
        // return this.baseElement;
        this.reset();
        this.createCalender();

        return this.calenderSection;
    }
}