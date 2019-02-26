import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-schedule-calendar',
    styleUrls: ['./schedule-calendar.component.scss'],
    template: `
      <div class="calendar">
        {{ date | json}}
      </div>
    `
})
export class ScheduleCalendarComponent implements OnInit {

    @Input()
    date: Date;

    constructor() {
    }

    ngOnInit() {
    }

}
