import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'store';

import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'app-workouts',
  styleUrls: ['workouts.component.scss'],
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="/assets/img/workout.svg">
          Your workouts
        </h1>
        <a class="btn__add"
           [routerLink]="['../workouts/new']">
          <img src="/assets/img/add-white.svg">
          New workout
        </a>
      </div>
      <div *ngIf="workouts$ | async as workouts;else loading">
        <div class="message" *ngIf="!workouts.length">
          <img src="/assets/img/face.svg">
          No workouts, add a new workout to start
        </div>
        <app-list-item
            *ngFor="let workout of workouts"
            [item]="workout"
            (remove)="removeWorkout($event)">
        </app-list-item>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/assets/img/loading.svg">
          Fetching workouts...
        </div>
      </ng-template>
    </div>
  `
})
export class WorkoutsComponent implements OnInit, OnDestroy {

  workouts$: Observable<Workout[]>;
  destroy$: Subject<boolean> = new Subject();

  constructor(private store: Store,
              private workoutsService: WorkoutsService) {
  }

  ngOnInit() {
    this.workouts$ = this.store.select <Workout[]>('workouts');
    this.workoutsService.workouts$
        .pipe(
            takeUntil(this.destroy$)
        )
        .subscribe();
  }

  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event.key);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
