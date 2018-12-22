import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './containers/register/register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        SharedModule
    ]
})
export class RegisterModule {
}
