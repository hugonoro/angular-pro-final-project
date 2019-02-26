import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutComponent } from './containers/workout/workout.component';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { WorkoutsRoutingModule } from './workouts-routing.module';
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';

@NgModule({
    declarations: [
        WorkoutComponent,
        WorkoutsComponent,
        WorkoutFormComponent,
        WorkoutTypeComponent
    ],
    imports: [
        CommonModule,
        WorkoutsRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class WorkoutsModule {
}
