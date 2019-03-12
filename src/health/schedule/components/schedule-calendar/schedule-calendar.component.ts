import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ScheduleItem, ScheduleList } from '../../../shared/services/schedule/schedule.service';

@Component({
    selector: 'app-schedule-calendar',
    styleUrls: ['./schedule-calendar.component.scss'],
    template: `
      <div class="calendar">
        <app-schedule-controls
                \[selected]="selectedDay"
                (move)="onChange($event)">
        </app-schedule-controls>
        <app-schedule-days
                [selected]="selectedDayIndex"
                (select)="selectDay($event)">
        </app-schedule-days>
        <app-schedule-section
                *ngFor="let section of sections"
                [name]="section.name"
                [section]="getSection(section.key)"
                (select)="selectSection($event, section.key)">
        </app-schedule-section>
      </div>
    `
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {

    @Input()
    set date(date: Date) {
        this.selectedDay = new Date(date.getTime());
    }

    @Input()
    items: ScheduleList;

    @Output()
    change = new EventEmitter<Date>();

    @Output()
    select = new EventEmitter<any>();

    selectedDayIndex: number;
    selectedDay: Date;
    selectedWeek: Date;

    sections = [
        { key: 'morning', name: 'Morning' },
        { key: 'lunch', name: 'Lunch' },
        { key: 'evening', name: 'Evening' },
        { key: 'snacks', name: 'Snacks and Drinks' }
    ];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.selectedDayIndex = this.getToday(this.selectedDay);
        this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    }

    ngOnInit() {
    }

    getSection(name: string): ScheduleItem {
        return this.items && this.items[name] || {};
    }

    selectSection({ type, assigned, data }: any, section: string) {
        const day = this.selectedDay;
        this.select.emit({
            type,
            assigned,
            section,
            day,
            data
        });
    }

    selectDay(index: number) {
        const selectedDay = new Date(this.selectedWeek);
        selectedDay.setDate(selectedDay.getDate() + index);
        this.change.emit(selectedDay);
    }

    onChange(weekOffset: number) {
        const startOfWeek = this.getStartOfWeek(new Date());
        const startDate = (
            new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
        );
        startDate.setDate(startDate.getDate() + ( weekOffset * 7 ));
        this.change.emit(startDate);
    }

    private getToday(date: Date) {
        let today = date.getDay() - 1;
        if (today < 0) {
            today = 6;
        }
        return today;
    }

    private getStartOfWeek(date: Date) {
        const day = date.getDay();
        const diff = date.getDate() - day + ( day === 0 ? -6 : 1 );
        return new Date(date.setDate(diff));
    }

}
