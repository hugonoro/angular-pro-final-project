import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from 'store';
import { AuthService, User } from '../../../auth/shared/services/auth/auth.service';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    template: `
      <div>
        <h1>{{ user$ | async | json}}</h1>
        <div class="wrapper">
          <router-outlet></router-outlet>
        </div>
      </div>
    `
})
export class AppComponent implements OnInit, OnDestroy {

    user$: Observable<User>;
    destroy$: Subject<boolean> = new Subject();

    constructor(private store: Store,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.auth$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();

        this.user$ = this.store.select<User>('user');
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
