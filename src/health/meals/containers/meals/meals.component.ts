import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'store';

import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'app-meals',
    styleUrls: ['meals.component.scss'],
    template: `
      <div>
        {{ meals$ | async | json}}
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
