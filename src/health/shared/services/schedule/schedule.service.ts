import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { Store } from 'store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';

export interface ScheduleItem {
    key: string;
    meals: Meal[];
    workouts: Workout[];
    section: string;
    timestamp: number;
}

export interface ScheduleList {
    morning?: ScheduleItem;
    lunch?: ScheduleItem;
    evening?: ScheduleItem;
    snacks?: ScheduleItem;

    [key: string]: any;
}

@Injectable()
export class ScheduleService {

    private date$ = new BehaviorSubject(new Date());
    private section$ = new Subject();
    private itemList$ = new Subject();

    items$ = this.itemList$
        .pipe(
            withLatestFrom(this.section$),
            map(([items, section]: any[]) => {
                const id = section.data.key;
                const defaults: ScheduleItem = {
                    key: null,
                    workouts: null,
                    meals: null,
                    section: section.section,
                    timestamp: new Date(section.day).getTime()
                };

                const payload = {
                    ...( id ? section.data : defaults ),
                    ...items
                };

                if (id) {
                    return this.updateSection(id, payload);
                } else {
                    return this.createSection(payload);
                }
            })
        );

    selected$ = this.section$
        .pipe(
            tap(next => this.store.set('selected', next))
        );

    list$ = this.section$
        .pipe(
            map((value: any) => this.store.value[value.type]),
            tap(next => this.store.set('list', next))
        );

    schedule$: Observable<any[]> = this.date$
        .pipe(
            tap((next: any) => this.store.set('date', next)),
            map((day: any) => {

                const startAt = ( new Date(day.getFullYear(), day.getMonth(), day.getDate()) ).getTime();
                const endAt = ( new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1) ).getTime() - 1;

                return { startAt, endAt };
            }),
            switchMap(({ startAt, endAt }: any) => {
                return this.getSchedule(startAt, endAt);
            }),
            map((data: any) => {

                const mapped: ScheduleList = {};
                for (const prop of data) {
                    if (!mapped[prop.section]) {
                        mapped[prop.section] = prop;
                    }
                }

                return mapped;

            }),
            tap((next: any) => this.store.set('schedule', next))
        );

    constructor(private store: Store,
                private db: AngularFireDatabase,
                private authService: AuthService) {
    }

    get uid() {
        return this.authService.user.uid;
    }

    updateItems(items: string[]) {
        this.itemList$.next(items);
    }

    updateDate(date: Date) {
        this.date$.next(date);
    }

    selectSection(event: any) {
        this.section$.next(event);
    }

    private createSection(payload: ScheduleItem) {
        return this.db.list(`schedule/${ this.uid }`).push(payload);
    }

    private updateSection(key: string, payload: ScheduleItem) {
        return this.db.object(`schedule/${ this.uid }/${ key }`).update(payload);
    }

    private getSchedule(startAt: number, endAt: number) {
        return this.db.list(`schedule/${ this.uid }`, ref => ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)).snapshotChanges()
            .pipe(
                map(schedules => schedules.map(schedule => ( { key: schedule.key, ...schedule.payload.val() } )))
            );
    }

}
