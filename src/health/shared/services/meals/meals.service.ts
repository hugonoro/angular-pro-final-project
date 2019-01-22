import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { Store } from 'store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Meal {
    key: string;
    name: string;
    ingredients: string[];
    timestamp: number;
}


@Injectable()
export class MealsService {

    meals$: Observable<Meal[]> = this.db.list<Meal>(`meals/${ this.uid }`).snapshotChanges()
        .pipe(
            map(actions => actions.map(a => ( { key: a.key, ...a.payload.val() } ))),
            tap(next => this.store.set('meals', next))
        );

    constructor(private store: Store,
                private db: AngularFireDatabase,
                private authService: AuthService) {
    }

    get uid() {
        return this.authService.user.uid;
    }

    getMeal(key: string) {
        if (!key) {
            return of({});
        }

        return this.store.select<Meal[]>('meals')
            .pipe(
                filter(Boolean),
                map(meals => meals.find((meal: Meal) => meal.key === key))
            );

    }

    addMeal(meal: Meal) {
        this.db.list(`meals/${ this.uid }`).push(meal);
    }

    removeMeal(key: string) {
        this.db.list(`/meals/${ this.uid }`).remove(key);
    }
}
