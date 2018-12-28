import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsComponent } from './containers/meals/meals.component';

import { MealsRoutingModule } from './meals-routing.module';

@NgModule({
    declarations: [
        MealsComponent
    ],
    imports: [
        CommonModule,
        MealsRoutingModule,
        ReactiveFormsModule
    ]
})
export class MealsModule {
}
