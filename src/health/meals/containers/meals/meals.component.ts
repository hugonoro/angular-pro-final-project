import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'store';

import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'app-meals',
    styleUrls: ['meals.component.scss'],
    template: `
      <div class="meals">
        <div class="meals__title">
          <h1>
            <img src="/assets/img/food.svg">
            Your meals
          </h1>
          <a class="btn__add"
             [routerLink]="['../meals/new']">
            <img src="/assets/img/add-white.svg">
            New meal
          </a>
        </div>
        <div *ngIf="meals$ | async as meals;else loading">
          <div class="message" *ngIf="!meals.length">
            <img src="/assets/img/face.svg">
            No meals, add a new meal to start
          </div>
        </div>
        <ng-template #loading>
          <div class="message">
            <img src="/assets/img/loading.svg">
            Fetching meals...
          </div>
        </ng-template>
      </div>
    `
})
export class MealsComponent implements OnInit, OnDestroy {

    meals$: Observable<Meal[]>;
    destroy$: Subject<boolean> = new Subject();

    constructor(private store: Store,
                private mealsService: MealsService) {
    }

    ngOnInit() {
        this.meals$ = this.store.select <Meal[]>('meals');
        this.mealsService.meals$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

}
