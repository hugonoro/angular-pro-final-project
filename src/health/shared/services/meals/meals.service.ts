import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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

    addMeal(meal: Meal) {
        this.db.list(`meals/${ this.uid }`).push(meal);
    }

    removeMeal(key: string) {
        this.db.list(`/meals/${ this.uid }`).remove(key);
    }
}
