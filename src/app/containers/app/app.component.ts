import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from 'store';
import { AuthService, User } from '../../../auth/shared/services/auth/auth.service';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    template: `
      <div>
        <app-header
                [user]="user$ | async"
                (logout)="onLogout()">
        </app-header>
        <app-nav *ngIf="(user$ | async)?.authenticated"></app-nav>
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
                private router: Router,
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

    async onLogout() {
        await this.authService.logoutUser();
        this.router.navigate(['/auth/login']);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
