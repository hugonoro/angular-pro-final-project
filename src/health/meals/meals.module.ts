import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { MealsComponent } from './containers/meals/meals.component';
import { MealsRoutingModule } from './meals-routing.module';
import { MealComponent } from './containers/meal/meal.component';

@NgModule({
    declarations: [
        MealsComponent,
        MealComponent,
        MealFormComponent
    ],
    imports: [
        CommonModule,
        MealsRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class MealsModule {
}
