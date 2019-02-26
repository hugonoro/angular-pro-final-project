import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-schedule-calendar',
    styleUrls: ['./schedule-calendar.component.scss'],
    template: `
      <div class="calendar">
        <app-schedule-controls [selected]="selectedDay" (move)="onChange($event)">
        </app-schedule-controls>
      </div>
    `
})
export class ScheduleCalendarComponent implements OnInit {

    @Input()
    set date(date: Date) {
        this.selectedDay = new Date(date.getTime());
    }

    @Output()
    change = new EventEmitter<Date>();

    selectedDay: Date;

    constructor() {
    }

    ngOnInit() {
    }

    onChange(weekOffset: number) {
        const startOfWeek = this.getStartOfWeek(new Date());
        const startDate = (
            new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
        );
        startDate.setDate(startDate.getDate() + ( weekOffset * 7 ));
        this.change.emit(startDate);
    }

    private getStartOfWeek(date: Date) {
        const day = date.getDay();
        const diff = date.getDate() - day + ( day === 0 ? -6 : 1 );
        return new Date(date.setDate(diff));
    }

}
