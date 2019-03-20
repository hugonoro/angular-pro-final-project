import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { Store } from 'store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Workout {
    key: string;
    name: string;
    type: string;
    strength: any;
    endurance: any;
    timestamp: number;
}

@Injectable()
export class WorkoutsService {

    workouts$: Observable<Workout[]> = this.db.list<Workout>(`workouts/${ this.uid }`).snapshotChanges()
        .pipe(
            map(workouts => workouts.map(workout => ( { key: workout.key, ...workout.payload.val() } ))),
            tap(next => this.store.set('workouts', next))
        );

    constructor(private store: Store,
                private db: AngularFireDatabase,
                private authService: AuthService) {
    }

    get uid() {
        return this.authService.user.uid;
    }

    getWorkout(key: string) {
        if (!key) {
            return of({});
        }

        return this.store.select<Workout[]>('workouts')
            .pipe(
                filter(Boolean),
                map(workouts => workouts.find((workout: Workout) => workout.key === key))
            );

    }

    addWorkout(workout: Workout) {
        this.db.list(`workouts/${ this.uid }`).push(workout);
    }

    updateWorkout(key: string, workout: Workout) {
        this.db.object(`workouts/${ this.uid }/${ key }`).update(workout);
    }

    removeWorkout(key: string) {
        this.db.list(`/workouts/${ this.uid }`).remove(key);
    }
}
