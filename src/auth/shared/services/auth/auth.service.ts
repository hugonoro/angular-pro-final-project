import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { tap } from 'rxjs/operators';

import { Store } from 'store';

export interface User {
    email: string;
    uid: string;
    authenticated: boolean;
}

@Injectable()
export class AuthService {

    auth$ = this.angularFireAuth.authState
        .pipe(
            tap((next) => {
                if (!next) {
                    this.store.set('user', null);
                    return;
                }
                const user: User = {
                    email: next.email,
                    uid: next.uid,
                    authenticated: true
                };
                this.store.set('user', user);
            })
        );

    constructor(private angularFireAuth: AngularFireAuth,
                private store: Store) {
    }

    createUser(email: string, password: string) {
        return this.angularFireAuth.auth
            .createUserWithEmailAndPassword(email, password);
    }

    loginUser(email: string, password: string) {
        return this.angularFireAuth.auth
            .signInWithEmailAndPassword(email, password);
    }
}
