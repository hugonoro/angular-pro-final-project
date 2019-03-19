import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'store';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { ScheduleItem, ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';

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
        <app-schedule-assign
                *ngIf="open"
                [section]="selected$ | async"
                [list]="list$ | async">
        </app-schedule-assign>
      </div>
    `
})
export class ScheduleComponent implements OnInit, OnDestroy {

    open = false;

    date$: Observable<Date>;
    schedule$: Observable<ScheduleItem[]>;
    selected$: Observable<any>;
    list$: Observable<Meal[] | Workout[]>;
    destroy$: Subject<boolean> = new Subject();

    constructor(private store: Store,
                private mealsService: MealsService,
                private workoutsService: WorkoutsService,
                private scheduleService: ScheduleService) {
    }

    ngOnInit() {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');
        this.selected$ = this.store.select('selected');
        this.list$ = this.store.select('list');

        forkJoin(
            this.scheduleService.schedule$,
            this.scheduleService.selected$,
            this.scheduleService.list$,
            this.mealsService.meals$,
            this.workoutsService.workouts$
        )
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    changeDate(date: Date) {
        this.scheduleService.updateDate(date);
    }

    changeSection(event: any) {
        this.open = true;
        this.scheduleService.selectSection(event);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
