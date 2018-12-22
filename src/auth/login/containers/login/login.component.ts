import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-login',
    template: `
      <div>
        <app-auth-form (submitted)="loginUser($event)">
          <h1>Login</h1>
          <a routerLink="/auth/register">Not registered?</a>
          <button type="submit">
            Login
          </button>
        </app-auth-form>
      </div>
    `
})
export class LoginComponent {

    constructor() {
    }

    loginUser(event: FormGroup) {
        console.log(event);
    }
}
