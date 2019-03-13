import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'store';
import { ScheduleItem, ScheduleService } from '../../../shared/services/schedule/schedule.service';

@Component({
    selector: 'app-schedule',
    styleUrls: ['schedule.component.scss'],
    template: `
      <div class="schedule">
        <app-schedule-calendar
                [date]="date$ | async"
                [items]="schedule$ | async"
                (change)="changeDate($event)"
                (select)="changeSection($event)">
        </app-schedule-calendar>
      </div>
    `
})
export class ScheduleComponent implements OnInit, OnDestroy {

    date$: Observable<Date>;
    schedule$: Observable<ScheduleItem[]>;
    destroy$: Subject<boolean> = new Subject();

    constructor(private store: Store,
                private scheduleService: ScheduleService) {
    }

    ngOnInit() {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');

        this.scheduleService.schedule$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();

        this.scheduleService.selected$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    changeDate(date: Date) {
        this.scheduleService.updateDate(date);
    }

    changeSection(event: any) {
        this.scheduleService.selectSection(event);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
