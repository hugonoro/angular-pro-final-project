import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';


@Component({
  selector: 'app-workout',
  styleUrls: ['./workout.component.scss'],
  template: `
      <div class="workout">
        <div class="workout__title">
          <h1>
            <img src="/assets/img/workout.svg">
            <span *ngIf="workout$ | async as workout; else title;">
              {{ workout.name ? 'Edit' : 'Create' }} workout
            </span>
            <ng-template #title>
              Loading...
            </ng-template>
          </h1>
        </div>
        <div *ngIf="workout$ | async as workout; else loading;">
          <app-workout-form
                  [workout]="workout"
                  (create)="addWorkout($event)"
                  (update)="updateWorkout($event)"
                  (remove)="removeWorkout($event)">
          </app-workout-form>
        </div>
        <ng-template #loading>
          <div class="message">
            <img src="/assets/img/loading.svg">
            Fetching workout...
          </div>
        </ng-template>
      </div>
    `
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$: Observable<Workout>;
  destroy$: Subject<boolean> = new Subject();

  constructor(private workoutsService: WorkoutsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.workoutsService.workouts$
        .pipe(takeUntil(this.destroy$))
        .subscribe();

    this.workout$ = this.route.params
        .pipe(
            switchMap(param => this.workoutsService.getWorkout(param.id))
        );
  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout() {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
